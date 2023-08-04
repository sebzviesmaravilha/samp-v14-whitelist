module.exports = {
    Bot: {
        Token: "MTEzNjkzNDkxODA1Njg1MzYwNg.GldAHl.5EenPnyOinJPHvlOTF_yVKuoBdInJjGmfRn1EU" // Botun tokenini girin, intentlerini aktif etmeyi unutmayın.
    },
    Roles: {
        Owner: '1096433544395489383', // Setup komutunu kullanabilecek rol idsi.
        Whitelist_Staff: '1096433596694278194', // Whitelist sorumlusunun rol idsi.
        Whitelist: '1096433582983102565', // Whitelist rolünün idsi.
        Non_Whitelist: '1096433583985533018' // Non Whitelist rolünün idsi.
    },
    Channels: {
        Whitelist: '1096433642483499122', // Whitelist başvurusunun yapılacağı kanalın idsi.
        Whitelist_Staff: '1096433644752613476', // Whitelist başvurularının geleceği kanalın idsi.
        Information: '1096433643657896066' // Whitelist bilgilerinin verileceği kanalın idsi.
    },
    Embed: {
        Color: 'Aqua', // Embed mesajının rengi.
        Author: 'Maravilha', // Embed mesajının author kısmı.
        Description: 'Whitelist başvurusu yapmak için butona tıkla.', // Embed mesajının içeriği.
        Footer: 'Coded by maravilha', // Embed kısmının alt başlığı.
        Image: 'https://media.discordapp.net/attachments/1135305015427350660/1136936830789484585/IMG_3787.png?width=370&height=670', // Embed kısmının resmi.
    },
    Buttons: {
        Form_Style: '2', // Whitelist başvur butonunun rengi, 1 Mavi, 2 Gri, 3 Yeşil, 4 Kırmızı.
        Approve_Style: '3', // Başvuruyu onayla butonunun rengi, 1 Mavi, 2 Gri, 3 Yeşil, 4 Kırmızı.
        Disapprove_Style: '4', // Başvuruyu reddet butonunun rengi, 1 Mavi, 2 Gri, 3 Yeşil, 4 Kırmızı.
        Label: '📧 Whitelist Başvurusu' // Başvuru butonunun içeriği.
    },
    Modal: {
        Title: 'Whitelist Başvuru Sistemi', // Modal kısmının başlığı.
        Question_1: 'Soru 1', // Modal kısmı 1.soru.
        Question_2: 'Soru 2', // Modal kısmı 2.soru.
        Question_3: 'Soru 3', // Modal kısmı 3.soru, eğer birden fazla soru sormak istiyorsanız aynı title'da 2 soru sorabilirsiniz. 3 sorunun maximum cevap sınırı 1000 harf.
    }
}