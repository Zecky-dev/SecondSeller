Docker: Kullanılmadı <br>
REST API: Kullanıldı

## Zekeriya Dönmez Kodlama

1. Kayıt Olma

```javascript
const register = async (req, res) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userInfo = { ...req.body, password: hashedPassword };
    const existingUser = await User.findOne({
      $or: [
        { emailAddress: userInfo.emailAddress },
        { phoneNumber: userInfo.phoneNumber },
      ],
    });
    if (!existingUser) {
      const createdUser = await User.create(userInfo);
      const token = jwt.sign(
        { userId: createdUser._id },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "24h" }
      );
      return res.status(201).json({
        status: "success",
        message: "Kullanıcı oluşturuldu!",
        token,
      });
    } else {
      return res.status(409).json({
        status: "error",
        message: "Kullanıcı zaten mevcut",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Kullanıcı oluşturulurken bir hata meudana geldi!",
      error: err.response.data,
    });
  }
};
```


2. İlan Oluşturma

```javascript
const createAdvertisement = async (req, res) => {
  try {
    const newAdvertisement = await Advertisement.create(req.body);
    const newAdvertisementID = newAdvertisement.id;
    const postOwnerID = newAdvertisement.owner;
    await User.findByIdAndUpdate(postOwnerID, {
      $push: { advertisements: newAdvertisementID },
    });
    return res.status(201).json({
      status: "success",
      message: "İlan oluşturuldu!",
      data: newAdvertisement,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Sunucu hatası!",
      error: err.message,
    });
  }
};
```

3. İlanları Filtreleme

```javascript
const filterAdvertisements = async (req, res) => {
  try {
    const queryParameters = req.query;
    const filter = {};

    // Fiyat aralığı kontrolü
    const priceMin = parseInt(queryParameters.price_min);
    const priceMax = parseInt(queryParameters.price_max);
    if (!isNaN(priceMin)) {
      filter.price = { $gte: priceMin };
    }
    if (!isNaN(priceMax)) {
      filter.price = { ...filter.price, $lte: priceMax }; // Eğer priceMin da verilmişse, aynı objenin içine $lte de eklenmeli
    }

    // Kategori kontrolü
    const category = queryParameters.category;
    if (category && category !== "default") {
      filter.category = category;
    }

    // Kategori kontrolü
    const title = queryParameters.title;
    if (title && title !== "") {
      filter.title = { $regex: title, $options: "i" };
    }

    // Mongoose sort objesi
    const sort = {};
    for (let query in queryParameters) {
      const val = queryParameters[query];
      if (query === "price" || query === "date") {
        sort[query] = val === "ascending" ? 1 : -1;
      }
    }
    const filteredAdvertisements = await Advertisement.find(filter)
      .sort(sort)
      .exec();
    return res.status(200).json({
      status: "success",
      message: "Filtrelenmiş ilanlar getirildi!",
      data: filteredAdvertisements,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "İlanlar filtrelenirken bir hata meydana geldi!",
      error: err.response.data,
    });
  }
};
```


4. Kullanıcı Bilgileri Getirme

```javascript
const getUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findById(userID);
    // Eğer user null ise, 404 Not Found yanıtı döndür
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Kullanıcı bulunamadı!",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Kullanıcı getirildi!",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Kullanıcı getirilirken hata meydana geldi!",
      error: err.message,
    });
  }
};
```


## Selin Aydemir Kodlama

1. İlan Güncelleme

```javascript
const updateAdvertisement = async (req, res) => {
  try {
    const advertisementID = req.params.id;
    const updatedAdvertisement = await Advertisement.findByIdAndUpdate(
      advertisementID,
      req.body,
      { new: true }
    );

    if (!updatedAdvertisement) {
      return res.status(404).json({
        status: "error",
        message: "İlan bulunamadı!",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "İlan güncellendi!",
      data: updatedAdvertisement,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Sunucu hatası!",
      error: err.message,
    });
  }
};
```


2. İlan Silme

```javascript
const removeAdvertisement = async (req, res) => {
  try {
    const advertisementID = req.query.id;
    const deletedAdvertisement = await Advertisement.findByIdAndDelete(
      advertisementID
    );
    if (!deletedAdvertisement) {
      return res.status(404).json({
        status: "error",
        message: "İlan bulunamadı!",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "İlan silindi!",
      data: deletedAdvertisement,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Sunucu hatası!",
      error: err.message,
    });
  }
};
```

3. Doğrulama Epostası Gönderme

```javascript
const sendEmailVerification = async (req, res) => {
  const { emailAddress, phoneNumber, type } = req.body;
  let filters;

  if (type === "phoneNumberUpdate") {
    filters = [{ phoneNumber }];
  } else if (type === "emailAddressUpdate") {
    filters = [{ emailAddress }];
  } else {
    filters = [{ emailAddress }, { phoneNumber }];
  }
  userExists = await User.findOne({
    $or: filters,
  });
  if (!userExists) {
    const verificationCode = await sendVerificationEmail(emailAddress);
    return res.status(200).json({
      status: "success",
      message: "Doğrulama e-posta'sı gönderildi!",
      data: verificationCode,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "Kullanıcı zaten kayıtlı!",
    });
  }
};
```

## İsmail Kaya Kodlama

1. Giriş Yap
2. İlan Bilgileri Getirme
3. Favoriye Alma / Favoriden Kaldırma

## Kamil Özdemir Kodlama

1. Şifre Sıfırlama
2. Şifre Güncelleme
3. Kullanıcının İlanlarını Getirme

## Alper Avcı Kodlama

1. Kullanıcı Güncelleme

   ```javascript
   const updateUser = async (req, res) => {
     try {
       const userID = req.params.id;
       const updatedUser = await User.findByIdAndUpdate(userID, req.body, {
         returnDocument: 'after',
       });

       if (!updatedUser) {
         return res.status(404).json({
           status: 'error',
           message: 'Kullanıcı bulunamadı.',
         });
       }

       return res.status(200).json({
         status: 'success',
         message: 'Kullanıcı güncellendi.',
         data: updatedUser,
       });
     } catch (error) {
       return res.status(500).json({
         status: 'error',
         message: 'Kullanıcı güncellenirken hata meydana geldi!',
         error: err.message,
       });
     }
   };
   ```

2. Şifre Değiştirme

```javascript
const changePassword = async (req, res) => {
  const {oldPassword, newPassword} = req.body;
  const userID = req.params.id;
  const saltRounds = 10;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Kullanıcı bulunamadı!',
      });
    }

    const passwordValid = await bcrypt.compare(oldPassword, user.password);
    if (passwordValid) {
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      await User.findByIdAndUpdate(
        userID,
        {password: hashedPassword},
        {
          returnDocument: 'after',
        },
      );

      const token = jwt.sign({userId: userID}, process.env.JWT_SECRET_TOKEN, {
        expiresIn: '24h',
      });

      return res.status(200).json({
        status: 'success',
        message: 'Şifre değiştirme başarılı!',
        data: token,
      });
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'Geçersiz şifre!',
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Şifre değiştirilirken bir hata meydana geldi.',
      error: err.message,
    });
  }
};
```

3. Bütün İlanları Getirme

```javascript
const getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find({});
    return res.status(200).json({
      status: 'success',
      message: 'Bütün ilanlar getirildi!',
      data: advertisements,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Sunucu hatası!',
      error: err.message,
    });
  }
};
```

4. Kullanıcı Bloklama / Blok Kaldırma

```javascript
const blockUser = async (req, res) => {
  const {id, from} = req.query;
  try {
    let user = await User.findById(from);
    const isInclude = user.blocked.includes(id);
    if (isInclude) {
      user = await User.findByIdAndUpdate(
        from,
        {$pull: {blocked: id}},
        {returnDocument: 'after'},
      );
    } else {
      user = await User.findByIdAndUpdate(
        from,
        {$push: {blocked: id}},
        {returnDocument: 'after'},
      );
    }
    return res.status(200).json({
      status: 'success',
      message: isInclude
        ? 'Kullanıcının engeli kaldırıldı!'
        : 'Kullanıcı engellendi!',
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Engelleme sırasında hata meydana geldi!',
      error: err.message,
    });
  }
};
```
