const express = require('express');
const cors = require('cors');
const axios = require('axios');
const iconv = require('iconv-lite');
const path = require('path');

const app = express();
const PORT = 3000;

// CORSを有効化
app.use(cors());

// JSONボディのパース
app.use(express.json());

// staticファイルの配信
app.use(express.static('static'));

// Shift_JISエンコーディング対応のプロキシエンドポイント
app.get('/api/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    console.log(`🌐 プロキシリクエスト: ${targetUrl}`);
    
    const response = await axios.get(targetUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ja,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate'
      }
    });

    // Shift_JISからUTF-8に変換
    const decodedData = iconv.decode(Buffer.from(response.data), 'Shift_JIS');
    
    console.log(`✅ レスポンス取得成功: ${decodedData.length} 文字`);
    
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(decodedData);
    
  } catch (error) {
    console.error(`❌ プロキシエラー: ${error.message}`);
    res.status(500).json({
      error: 'Proxy request failed',
      message: error.message,
      url: targetUrl
    });
  }
});

// ルートパスでindex.htmlを返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// サーバー起動
app.listen(PORT, () => {
  console.log('🚀 Premier DAM検索サーバー起動');
  console.log(`📍 アクセス: http://localhost:${PORT}`);
  console.log('🎤 Premier DAM店舗検索 (Express版)');
  console.log('✅ Shift_JIS エンコーディング対応');
  console.log('🌐 CORSプロキシ機能搭載');
});
