const message = `I don't even know if you will read this. But if you do... I just want you to know, I still sometimes think about you.

Dear Inge Chentia,

Aku pengen minta maaf untuk yang kemarin dan minggu lalu. Aku pengen minta maaf ya, aku tau emang kayanya ego ku aja yang gede. Ga seharusnya aku ngga ngasih kabar ke kamu.

I'm sorry for making you disappointed and losing trust in me. Kalo kamu mau ngasih kesempatan, mungkin aku bakal berubah agar kejadian seperti itu tidak terulang lagi.

I really, really love you, Cen. I love you. I don't just like you, but I really, really love you, and maybe if I really had to, I would do it, even though it's hard for me to express it.

Untuk yang kemarin aku bener-bener minta maaf ya. Aku janji aku ngga akan begitu lagi, dan aku gamau kalo hubungan kita jadi renggang, I want us to always be together at every moment

I have flowers for you`;

let typingIndex = 0;
let isPlaying = false;
const audio = document.getElementById('bg-music');
// Hapus referensi ke elemen yang tidak ada di HTML
// const audioControl = document.getElementById('audio-control');
// const musicIcon = document.getElementById('music-icon');
// const audioText = document.querySelector('.audio-text');

// Fungsi toggle musik - disederhanakan
function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        // Langsung play tanpa catch error yang menampilkan alert
        audio.play().catch(() => {
            // Abaikan error autoplay, akan dicoba lagi saat showMessage
            console.log('Autoplay ditolak browser, akan dicoba nanti');
        });
        isPlaying = true;
    }
}

// Coba autoplay saat halaman dimuat
window.addEventListener('load', () => {
    audio.volume = 0.5; // Volume 50%
    
    // Coba play langsung saat load
    audio.play().then(() => {
        isPlaying = true;
        console.log('Musik autoplay berhasil');
    }).catch(() => {
        // Gagal autoplay, set isPlaying tetap false
        isPlaying = false;
        console.log('Autoplay dicegah browser, akan diputar saat masuk halaman pesan');
    });
});

function showMessage() {
    document.getElementById('page-1').classList.remove('active');
    document.getElementById('page-2').classList.add('active');
    
    // Mulai musik otomatis saat masuk ke halaman pesan
    if (!isPlaying) {
        audio.play().then(() => {
            isPlaying = true;
            console.log('Musik berhasil diputar');
        }).catch(error => {
            console.log('Gagal memutar musik:', error);
            // Tidak menampilkan alert apapun
        });
    }
    
    typeWriter();
}

function typeWriter() {
    const element = document.getElementById('message-text');
    const messageContainer = document.querySelector('.message-container');
    
    if (typingIndex < message.length) {
        element.innerHTML = message.substring(0, typingIndex + 1) + '<span class="cursor"></span>';
        typingIndex++;
        
        // Auto scroll ke bawah setiap kali teks bertambah
        messageContainer.scrollTop = messageContainer.scrollHeight;
        
        // Kecepatan mengetik acak untuk efek natural
        const speed = Math.random() * 30 + 20;
        setTimeout(typeWriter, speed);
    } else {
        element.innerHTML = message + '<span class="cursor"></span>';
        // Scroll ke bawah sekali lagi setelah selesai
        messageContainer.scrollTop = messageContainer.scrollHeight;
        
        // Tampilkan tombol bunga setelah selesai mengetik
        setTimeout(() => {
            const btn = document.getElementById('flower-btn');
            btn.classList.remove('hidden');
            setTimeout(() => btn.classList.add('show'), 100);
            
            // Scroll ke bawah agar tombol terlihat
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }, 500);
    }
}

function showFlower() {
    document.getElementById('page-2').classList.remove('active');
    document.getElementById('page-3').classList.add('active');
    
    // Mulai efek partikel hati
    createParticles();
    
    // Tampilkan pesan akhir
    setTimeout(() => {
        document.getElementById('final-msg').classList.remove('hidden');
    }, 4500);
}

function createParticles() {
    const colors = ['❤️', '💖', '💕', '💗', '💓', '🌸', '✨'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.fontSize = (Math.random() * 20 + 15) + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 7000);
    }, 400);
}

// Tambahkan efek hati berdetak saat hover di halaman awal
document.addEventListener('DOMContentLoaded', () => {
    const heart = document.querySelector('.heart');
    if (heart) {
        heart.addEventListener('click', () => {
            heart.style.transform = 'scale(1.3)';
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
            }, 200);
        });
    }
});