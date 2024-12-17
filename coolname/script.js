document.addEventListener('DOMContentLoaded', function() {
    let currentLang = 'en'; // 默认语言为英文

    // 语言切换功能
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            updateLanguage(currentLang);
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 初始化时设置英文按钮为激活状态
    document.querySelector('[data-lang="en"]').classList.add('active');

    function updateLanguage(lang) {
        // 更新标题和副标题
        document.querySelector('.title').textContent = translations[lang].title;
        document.querySelector('.subtitle').textContent = translations[lang].subtitle;

        // 更新性别按钮
        const genderBtns = document.querySelectorAll('.gender-btn');
        genderBtns.forEach(btn => {
            const gender = btn.dataset.gender;
            const genderData = translations[lang][`gender${gender.charAt(0).toUpperCase() + gender.slice(1)}`];
            btn.querySelector('.icon').textContent = genderData.icon;
            btn.querySelector('.label').textContent = genderData.label;
        });

        // 更新风格标题
        document.querySelector('.style-section h3').textContent = translations[lang].styleTitle;

        // 更新风格标签
        const tags = document.querySelectorAll('.tag');
        const styles = Object.values(translations[lang].styles);
        tags.forEach((tag, index) => {
            tag.textContent = styles[index];
        });

        // 更新输入框占位符
        document.querySelector('.preference-input').placeholder = translations[lang].interestsPlaceholder;

        // 更新姓氏选项
        const surnameLabels = document.querySelectorAll('.surname-section .radio-label');
        surnameLabels[0].textContent = translations[lang].randomSurname;
        surnameLabels[1].textContent = translations[lang].customSurname;
        document.querySelector('.surname-select').textContent = translations[lang].selectSurname;

        // 更新生成按钮
        document.querySelector('.generate-btn').textContent = translations[lang].generateBtn;

        // 更新结果标题
        const resultTitle = document.querySelector('.result-section h2');
        if (resultTitle) {
            resultTitle.textContent = translations[lang].resultTitle;
        }

        // 更新页面标题和描述
        updatePageTitle(lang);
        
        // 更新 meta 描述
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = translations[lang].metaDescription;
        }
    }

    const tags = document.querySelectorAll('.tag');
    const generateBtn = document.querySelector('.generate-btn');
    const resultSection = document.querySelector('.result-section');
    const nameCards = document.querySelector('.name-cards');

    // 标签选择逻辑
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
        });
    });

    // 姓氏选择按钮逻辑
    const surnameSelect = document.querySelector('.surname-select');
    surnameSelect.addEventListener('click', () => {
        // 这里可以添加姓氏选择的弹窗逻辑
        alert('姓氏选择功能开发中...');
    });

    // 模拟的名字生成函数
    function generateNames() {
        const names = ['张天明', '李雨晴', '王子轩', '刘梦琪', '陈思远'];
        nameCards.innerHTML = '';
        
        names.forEach(name => {
            const card = document.createElement('div');
            card.className = 'name-card';
            card.textContent = name;
            
            // 添加出现动画
            card.style.animation = 'fadeIn 0.5s ease-out forwards';
            nameCards.appendChild(card);
        });

        resultSection.classList.remove('hidden');
        setTimeout(() => {
            resultSection.classList.add('show');
        }, 100);
    }

    // 生成按钮点击事件
    generateBtn.addEventListener('click', () => {
        generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            generateBtn.style.transform = 'scale(1)';
            generateNames();
        }, 150);
    });

    // 输入框焦点效果
    const preferenceInput = document.querySelector('.preference-input');
    preferenceInput.addEventListener('focus', () => {
        preferenceInput.style.transform = 'translateY(-2px)';
    });

    preferenceInput.addEventListener('blur', () => {
        preferenceInput.style.transform = 'translateY(0)';
    });

    // 为标签添加随机动画效果
    function initializeTagCloud() {
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            // 随机旋转角度
            const rotate = Math.random() * 10 - 5;
            // 随机X轴位移
            const translateX = Math.random() * 20 - 10;
            // 随机Y轴位移
            const translateY = Math.random() * 20 - 10;
            
            tag.style.setProperty('--rotate', rotate);
            tag.style.setProperty('--translateX', translateX);
            tag.style.setProperty('--translateY', translateY);

            // 添加鼠标悬停效果
            tag.addEventListener('mouseover', () => {
                const newRotate = Math.random() * 10 - 5;
                tag.style.setProperty('--rotate', newRotate);
            });
        });
    }

    // 初始化标签云
    initializeTagCloud();

    // 窗口大小改变时重新初始化
    window.addEventListener('resize', initializeTagCloud);

    // 标签点击效果增强
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
            if(tag.classList.contains('selected')) {
                // 添加点击时的缩放动画
                tag.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    tag.style.transform = '';
                }, 200);
            }
        });
    });

    // 更新性别选择逻辑
    const genderBtns = document.querySelectorAll('.gender-btn');
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除其他按钮的激活状态
            genderBtns.forEach(b => b.classList.remove('active'));
            // 激活当前按钮
            btn.classList.add('active');
            
            // 添加点击动画效果
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            btn.appendChild(ripple);
            
            // 移除动画元素
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加动态标题更新
    function updatePageTitle(lang) {
        const titles = {
            en: "Chinese Name Generator | Create Your Perfect Chinese Name",
            zh: "中文取名生成器 | 创建你的完美中文名"
        };
        document.title = titles[lang];
    }
}); 