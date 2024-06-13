Docker: Kullanılmadı <br>
REST API: Kullanıldı

## Zekeriya Dönmez Kodlama

1. Kayıt Olma
2. İlan Oluşturma
3. İlanları Filtreleme
4. Kullanıcı Bilgileri Getirme

## Selin Aydemir Kodlama

1. İlan Güncelleme
2. İlan Silme
3. Doğrulama Epostası Gönderme

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
