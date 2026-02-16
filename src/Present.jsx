import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import device from 'current-device'
// import { beFull, isFull } from 'be-full';
import { words, wordsToPhone } from './data'
import './index.css'

// 新增：用于生成烟火效果的颜色数组
const BLESSING_COLORS = ['#FFD700', '#FFA500', '#FF6B6B', '#FF1493', '#00CED1', '#98FB98', '#DDA0DD'];

const Present = props => {

  const [isStart, setIsStart] = useState(true)

  function randomNum(min, max) {
    var num = (Math.random() * (max - min + 1) + min).toFixed(2);
    return num;
  }

  // 新增：获取随机颜色
  function getRandomColor() {
    return BLESSING_COLORS[Math.floor(Math.random() * BLESSING_COLORS.length)];
  }

  useEffect(() => {
    const init = (wordsArray) => {
      let container = document.querySelector('.container');
      console.log('====', container);
      let f = document.createDocumentFragment();
      wordsArray.forEach(w => {
        let word_box = document.createElement('div');
        let word = document.createElement('div');
        word.innerText = w;
        word.classList.add('word');
        const randomColor = getRandomColor();
        word.style.color = randomColor;
        word.style.fontFamily = '楷体';
        word.style.fontSize = '20px'
        word_box.classList.add('word-box');
        word_box.style.setProperty("--margin-top", randomNum(-40, 20) + 'vh');
        word_box.style.setProperty("--margin-left", randomNum(6, 35) + 'vw');
        word_box.style.setProperty("--animation-duration", randomNum(8, 20) + 's');
        word_box.style.setProperty("--animation-delay", randomNum(-20, 0) + 's');
        word_box.style.setProperty("--random-color", randomColor);

        word_box.appendChild(word);
        f.appendChild(word_box);
      })
      container.appendChild(f);
    }

    console.log('进入了这个页面');
    // 不再立即隐藏初始文字，让它们显示
    let textone = document.querySelector('.textone');
    let text = document.querySelector('.text');
    // 确保初始显示
    if (textone) textone.style.opacity = '1';
    if (text) text.style.opacity = '1';

    let wordsArr = wordsToPhone;
    if (device.desktop()) {
      console.log('电脑')
      wordsArr = words
    }
    init(wordsArr);
    setIsStart(false)
    setTimeout(() => {
      setIsStart(true);
    }, 1500)

    // 3秒后淡出初始文字
    setTimeout(() => {
      if (textone) textone.style.opacity = '0';
      if (text) text.style.opacity = '0';
    }, 3000)

    // 10秒后显示最终文字
    setTimeout(() => {
      let textoneTxt = document.querySelector('.textone').querySelector('h1');
      let textTxt = document.querySelector('.text').querySelector('h1');
      // 修改内容后显示
      textoneTxt.innerHTML = '🎊 新年快乐！漫天星空，祝福满满！🎊';
      textoneTxt.style.color = '#00FFE0';
      textoneTxt.style.fontSize = '36px';
      textoneTxt.style.fontFamily = '华文楷体';
      textoneTxt.style.textShadow = '0 0 40px rgba(0, 255, 224, 1), 0 0 80px rgba(0, 255, 224, 0.8), 0 0 120px rgba(135, 206, 250, 0.6)';
      textoneTxt.style.letterSpacing = '2px';
      textoneTxt.style.animation = 'textFadeInScale 1.5s ease-out forwards';
      // 显示最终文字（使用opacity过渡）
      if (textone) textone.style.opacity = '1';
      textTxt.innerHTML = '';
    }, 10000)
  }, [])

  return (
    <>
      <div className="sky">

        <div className="videofilm">
          <ReactPlayer
            width={'auto'}
            height={'auto'}
            url={props.videoSrc}
            playing={isStart}
            loop={true}
            volume={0.5}
          // onReady={(e) => { console.log('准备好了', e); setIsStart(true) }}
          />
        </div>
        <div className="textone">
          <h1>新年新开始</h1>
        </div>
        <div className="text">
          <h1>祝福送给你</h1>
        </div>

        <div className="container textContainer"></div>
      </div>
    </>
  )
}

export default Present;