# AI 逐字稿校正助手

以 Angular 和 NestJS 實作的 AI 逐字稿校正系統，支援 AI 自動校正、視覺化差異比對、使用者審閱、中翻英功能。

## 功能特色

- ✅ AI 自動校正逐字稿中的錯別字和同音異字
- ✅ 視覺化 Diff 顯示（紅色刪除線 + 綠色底線）
- ✅ 點擊切換接受/拒絕變更
- ✅ 即時定稿預覽
- ✅ 中翻英功能
- ✅ 匯出定稿文本
- ✅ 使用 Claude 3.5 Sonnet AI 模型

## 使用技術

### 前端
- **框架**: Angular
- 
### 後端
- **框架**: NestJS

## 專案結構

```
ai-proofreading-assistant/
├── frontend/                   # Angular 專案
│   ├── src/app/
│   │   ├── core/               # 核心服務
│   │   ├── features/           # 功能模組
│   │   │   ├── toolbar/        # 工具列
│   │   │   ├── editor/         # 編輯器
│   │   │   └── side-panel/     # 右側面板
│   │   ├── models/             # TypeScript 介面
│   │   └── signals/            # State Management
│   └── tailwind.config.js
│
└── backend/                     # NestJS 專案
    ├── src/
    │   ├── correction/         # 校正模組
    │   └── anthropic/          # Anthropic API 整合
    └── .env                    # 環境變數
```

## 快速開始

### 前置需求

- Node.js 18+
- npm 或 yarn
- Anthropic API Key

### 安裝步驟

#### 1. 設定後端

```bash
cd backend

# 安裝依賴
npm install

# 設定環境變數
cp .env.example .env
# 編輯 .env 並填入你的 ANTHROPIC_API_KEY
```

編輯 `backend/.env`：
```env
ANTHROPIC_API_KEY=sk-ant-你的API金鑰
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

#### 2. 設定前端

```bash
cd frontend

# 安裝依賴
npm install
```

### 啟動應用

#### 啟動後端（Terminal 1）

```bash
cd backend
npm run start:dev
```

後端將在 `http://localhost:3000` 運行

#### 啟動前端（Terminal 2）

```bash
cd frontend
ng serve
```

前端將在 `http://localhost:4200` 運行

### 使用流程

1. **輸入文字**：在編輯器中輸入需要校正的逐字稿（最多 1000 字）
2. **自訂指示**（選填）：提供額外的校正指示，例如特定領域術語
3. **開始校正**：點擊「開始校正」按鈕，等待 AI 處理
4. **審閱變更**：查看 Diff 結果，點擊綠色/紅色文字來接受或拒絕變更
5. **查看定稿**：在「定稿預覽」區塊查看最終結果
6. **翻譯**（選填）：點擊「翻譯成英文」取得英文版本
7. **匯出**：點擊「匯出定稿」下載純文字檔案

## API 端點

### 校正文本
```http
POST /api/correction/fix
Content-Type: application/json

{
  "text": "我在學習Angular",
  "customInstruction": "保持專有名詞大小寫"  // 選填
}
```

### 翻譯文本
```http
POST /api/correction/translate
Content-Type: application/json

{
  "finalText": "我正在學習 Angular"
}
```

## 開發指南

### 後端開發

```bash
cd backend

# 開發模式（熱重載）
npm run start:dev

# 建置
npm run build

# 生產模式
npm run start:prod
```

### 前端開發

```bash
cd frontend

# 開發伺服器
ng serve

# 建置
ng build

# 執行測試
ng test
```

## 待優化功能

- [ ] 批次處理多段文本
- [ ] 歷史記錄功能
- [ ] 補齊單元測試和 E2E 測試
