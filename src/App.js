import React, { useState } from 'react';

const GAME_MODES = {
  EASY: 'easy',
  NORMAL: 'normal',
  HARD: 'hard',
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape'
};

const MAX_ROUNDS = 2;

const IMAGE_SETS = {
  easy: [
    {
      images: [
        { url: '/photos/e1-ai.png', isAI: true },
        { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400', isAI: false },
        { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400', isAI: false }
      ],
      hint: 'Arka plan detaylarına dikkat edin'
    },
    {
      images: [
        { url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400', isAI: false },
        { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400', isAI: false },
        { url: '/photos/n_ai.png', isAI: true }
      ],
      hint: 'Renk geçişlerini inceleyin'
    }
  ],
  normal: [
    {
      images: [
        { url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400', isAI: false },
        { url: '/photos/m1-ai.png', isAI: true },
        { url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400', isAI: false }
      ],
      hint: 'Mantıksal hatalara odaklanın'
    },
    {
      images: [
        { url: '/photos/n2_ai.png', isAI: true },
        { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400', isAI: false },
        { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400', isAI: false }
      ],
      hint: 'Işık ve gölge dengelerine bakın'
    }
  ],
  hard: [
    {
      images: [
        { url: '/photos/alan-and-me.png', isAI: true },
        { url: '/photos/westm.jpeg', isAI: false },
        { url: '/photos/kent.jpeg', isAI: false }
      ],
      hint: 'Küçük tutarsızlıklara odaklanın'
    },
    {
      images: [
        { url: '/photos/n3_ai.png', isAI: true },
        { url: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400', isAI: false },
        { url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400', isAI: false }
      ],
      hint: 'Derinlik algısını değerlendirin'
    }
  ],
  portrait: [
    {
      images: [
        { url: '/photos/p2.png', isAI: false },
        { url: '/photos/port1-ai.png', isAI: true },
        { url: '/photos/port1.png', isAI: false }
      ],
      hint: 'Hangisinin Bilgisayar Bilimci olamayacağına odaklanın'
    },
    {
      images: [
        { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', isAI: false },
        { url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400', isAI: false },
        { url: '/photos/portt2.png', isAI: true }
      ],
      hint: 'Saç tellerinin doğallığını kontrol edin'
    }
  ],
  landscape: [
    {
      images: [
        { url: '/photos/man1-ai.png', isAI: true },
        { url: '/photos/man-2.jpeg', isAI: false },
        { url: '/photos/man2.jpeg', isAI: false }
      ],
      hint: 'Uzak mesafe netliğini inceleyin'
    },
    {
      images: [
        { url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400', isAI: false },
        { url: '/photos/mant1-ai.png', isAI: true },
        { url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400', isAI: false }
      ],
      hint: 'Su yansımalarına dikkat edin'
    }
  ]
};

const styles = {
  body: {
    margin: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    color: '#333'
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  menu: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center'
  },
  menuH1: {
    color: '#667eea',
    marginBottom: '20px',
    fontSize: '2.5em'
  },
  description: {
    color: '#666',
    marginBottom: '30px',
    lineHeight: '1.6',
    fontSize: '1.1em'
  },
  modeSelectionH2: {
    color: '#764ba2',
    margin: '30px 0 15px 0',
    fontSize: '1.5em'
  },
  modeBtn: {
    display: 'block',
    width: '100%',
    padding: '15px 30px',
    margin: '10px 0',
    fontSize: '1.2em',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  gameHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 100
  },
  score: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: '#667eea'
  },
  backBtn: {
    padding: '10px 20px',
    background: '#764ba2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s'
  },
  game: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    maxWidth: '1000px',
    width: '100%',
    marginTop: '80px'
  },
  gameH2: {
    textAlign: 'center',
    color: '#667eea',
    marginBottom: '30px',
    fontSize: '2em'
  },
  hint: {
    background: '#fff3cd',
    border: '2px solid #ffc107',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  imagesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  imageContainer: {
    borderRadius: '15px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '3px solid transparent'
  },
  imageContainerCorrect: {
    borderColor: '#28a745'
  },
  imageContainerWrong: {
    borderColor: '#dc3545'
  },
  image: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    display: 'block'
  },
  result: {
    background: 'white',
    borderRadius: '20px',
    padding: '60px 40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center'
  },
  resultH2: {
    fontSize: '2.5em',
    marginBottom: '20px'
  },
  success: {
    color: '#28a745'
  },
  failure: {
    color: '#dc3545'
  },
  resultP: {
    fontSize: '1.3em',
    color: '#666',
    marginBottom: '20px'
  },
  currentScore: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '30px 0'
  },
  resultActions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  nextBtn: {
    padding: '15px 40px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  menuBtn: {
    padding: '15px 40px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    background: '#6c757d',
    color: 'white'
  }
};
function App() {
  const [gameState, setGameState] = useState('menu');
  const [selectedMode, setSelectedMode] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [lastPoints, setLastPoints] = useState(0);

  const getMaxRoundsForMode = (mode) => {
    const sets = IMAGE_SETS[mode] || [];
    return Math.min(MAX_ROUNDS, sets.length);
  };

  const startGame = (mode) => {
    setSelectedMode(mode);
    setGameState('playing');
    setCurrentRound(0);
    setScore(0);
    setTotalRounds(0);
    setAttempts(0);
    setLastPoints(0);
    setSelectedImage(null);
    setShowHint(false);
  };

  const getCurrentSet = () => {
    if (!selectedMode) return null;
    const sets = IMAGE_SETS[selectedMode] || [];
    return sets[currentRound] || null;
  };

  const handleImageClick = (index) => {
    if (selectedImage !== null) return;

    const currentSet = getCurrentSet();
    if (!currentSet) return;

    const attemptsBefore = attempts;
    const isCorrect = currentSet.images[index].isAI;

    setSelectedImage(index);
    setAttempts(attemptsBefore + 1);

    if (isCorrect) {
      const earned = attemptsBefore === 0 ? 100 : 50;
      setLastPoints(earned);
      setScore((prev) => prev + earned);
      setTotalRounds((prev) => prev + 1);
      setTimeout(() => {
        setGameState('result');
      }, 1000);
    } else {
      if (attemptsBefore === 0) {
        setShowHint(true);
        setTimeout(() => {
          setSelectedImage(null);
        }, 2000);
      } else {
        setLastPoints(0);
        setTotalRounds((prev) => prev + 1);
        setTimeout(() => {
          setGameState('result');
        }, 1000);
      }
    }
  };

  const nextRound = () => {
    const maxRounds = getMaxRoundsForMode(selectedMode);
    if (currentRound + 1 >= maxRounds) {
      backToMenu();
      return;
    }
    setCurrentRound(currentRound + 1);
    setSelectedImage(null);
    setShowHint(false);
    setAttempts(0);
    setLastPoints(0);
    setGameState('playing');
  };

  const backToMenu = () => {
    setGameState('menu');
    setSelectedMode(null);
    setCurrentRound(0);
    setScore(0);
    setTotalRounds(0);
    setAttempts(0);
    setLastPoints(0);
    setSelectedImage(null);
    setShowHint(false);
  };

  if (gameState === 'menu') {
    return (
      <div style={styles.container}>
        <div style={styles.menu}>
          <h1 style={styles.menuH1}>AI Dedektörü Oyunu</h1>
          <p style={styles.description}>
            Karşınıza çıkan üç görselden hangisinin yapay zeka tarafından üretildiğini bulun!
            İlk denemede doğru bulursanız 100 puan, ikinci denemede 50 puan kazanırsınız.
          </p>
          <div>
            <h2 style={styles.modeSelectionH2}>Zorluk Seviyesi</h2>
            <button
              onClick={() => startGame(GAME_MODES.EASY)}
              style={styles.modeBtn}
              onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
            >
              Kolay
            </button>
            <button
              onClick={() => startGame(GAME_MODES.NORMAL)}
              style={styles.modeBtn}
              onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
            >
              Normal
            </button>
            <button
              onClick={() => startGame(GAME_MODES.HARD)}
              style={styles.modeBtn}
              onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
            >
              Zor
            </button>
            <h2 style={styles.modeSelectionH2}>Kategori</h2>
            <button
              onClick={() => startGame(GAME_MODES.PORTRAIT)}
              style={styles.modeBtn}
              onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
            >
              Portreler
            </button>
            <button
              onClick={() => startGame(GAME_MODES.LANDSCAPE)}
              style={styles.modeBtn}
              onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
            >
              Manzaralar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const currentSet = getCurrentSet();
    const maxRounds = getMaxRoundsForMode(selectedMode);

    if (!currentSet) return null;

    return (
      <div style={styles.container}>
        <div style={styles.gameHeader}>
          <div style={styles.score}>Skor: {score}</div>
          <div style={styles.score}>Tur: {totalRounds + 1} / {maxRounds}</div>
          <button
            onClick={backToMenu}
            style={styles.backBtn}
            onMouseOver={(e) => (e.target.style.background = '#667eea')}
            onMouseOut={(e) => (e.target.style.background = '#764ba2')}
          >
            Ana Menü
          </button>
        </div>
        <div style={styles.game}>
          <h2 style={styles.gameH2}>Hangisi AI tarafından üretildi?</h2>
          {showHint && (
            <div style={styles.hint}>
              <strong>İpucu:</strong> {currentSet.hint}
            </div>
          )}
          <div style={styles.imagesGrid}>
            {currentSet.images.map((img, index) => {
              let containerStyle = { ...styles.imageContainer };
              if (selectedImage === index) {
                containerStyle = {
                  ...containerStyle,
                  ...(img.isAI ? styles.imageContainerCorrect : styles.imageContainerWrong)
                };
              }

              return (
                <div
                  key={index}
                  style={containerStyle}
                  onClick={() => handleImageClick(index)}
                  onMouseOver={(e) => {
                    if (selectedImage === null) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img src={img.url} alt={`Seçenek ${index + 1}`} style={styles.image} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const currentSet = getCurrentSet();
    const maxRounds = getMaxRoundsForMode(selectedMode);

    if (!currentSet) return null;

    const correctIndex = currentSet.images.findIndex((img) => img.isAI);
    const wasCorrect = selectedImage === correctIndex;
    const isLastRound = currentRound + 1 >= maxRounds;

    return (
      <div style={styles.container}>
        <div style={styles.result}>
          {wasCorrect ? (
            <>
              <h2 style={{ ...styles.resultH2, ...styles.success }}>Tebrikler! Doğru Buldunuz!</h2>
              <p style={styles.resultP}>+{lastPoints} puan kazandınız</p>
            </>
          ) : (
            <>
              <h2 style={{ ...styles.resultH2, ...styles.failure }}>Yanlış Tahmin</h2>
              <p style={styles.resultP}>AI tarafından üretilen görsel {correctIndex + 1}. görseldi</p>
            </>
          )}
          <div style={styles.currentScore}>Toplam Skor: {score}</div>
          <div style={styles.resultActions}>
            {isLastRound ? (
              <button
                onClick={backToMenu}
                style={styles.nextBtn}
                onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
              >
                Ana Menüye Dön
              </button>
            ) : (
              <>
                <button
                  onClick={nextRound}
                  style={styles.nextBtn}
                  onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                >
                  Sonraki Tur
                </button>
                <button
                  onClick={backToMenu}
                  style={styles.menuBtn}
                  onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                >
                  Ana Menü
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
