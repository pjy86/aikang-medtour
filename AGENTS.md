# AiKang Medical Tour - 开发规范

## 工作流程
1. 收到功能需求后，先与客户确认细节
2. 更新需求文档 `docs/requirements.md`
3. 客户确认需求文档后再开始编码
4. 编码完成后提交客户验收

## 项目结构
```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页
│   ├── services/page.tsx   # 服务页
│   ├── about/page.tsx     # 关于页
│   └── contact/page.tsx   # 联系页
├── components/             # React 组件
│   ├── Header.tsx
│   └── Footer.tsx
└── app/globals.css        # 全局样式

docs/
└── requirements.md        # 需求文档
```

## 技术栈
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React Icons
- Vercel 部署

## 联系方式
- WhatsApp: +86 15711112233
- Email: info@aikangmedtour.com

## Vercel 项目
- Repository: github.com/pjy86/aikang-medtour
- URL: https://aikang-medtour.vercel.app