# 需求文档 - AiKang Medical Tour

## 项目概述
**项目名称**: 爱康医旅 (AiKang Medical Tour)  
**项目类型**: 医疗旅游服务官网  
**目标用户**: 美国及印尼的海外客户  
**核心功能**: 为海外客户提供来华高端医疗服务的全流程一站式服务

## 已完成功能

### 1. 网站页面
- [x] **首页** - Hero区、服务介绍、为什么选择我们、患者评价、联系表单
- [x] **服务页** - 8大医疗服务项目（心脏外科、肿瘤、骨科、神经科、眼科、生育，普通外科、预防健康）
- [x] **关于页** - 公司介绍、使命愿景、价值观、服务承诺
- [x] **联系页** - 联系方式、咨询表单、FAQ常见问题

### 2. 技术实现
- [x] Next.js 14 + TypeScript + Tailwind CSS
- [x] 响应式设计，支持移动端和桌面端
- [x] WhatsApp 一键联系功能
- [x] 静态导出部署到 Vercel

### 3. 联系信息
| 渠道 | 内容 |
|------|------|
| WhatsApp | +86 15711112233 |
| 电话 | +86 15711112233 / +86 15855159472 |
| Email | info@aikangmedtour.com |
| Discord | https://discord.gg/example |

### 4. 目标市场
- 主要: 美国 (USA)
- 次要: 印度尼西亚 (Indonesia)

## 开发中功能

### 5. 多语言支持
- [x] next-intl 配置
- [x] 翻译文件（zh/en/id）
- [x] 页面国际化改造

### 6. 数据存储与管理员
- [x] Vercel Postgres 数据库配置
- [x] API 路由（联系表单写入数据库）
- [x] 管理员登录页面
- [x] 客户数据查看页面
- [x] Nodemailer SMTP 邮件通知（用户提交表单后发送邮件通知）

### 7. CMS 内容管理
- [x] CMS 后台管理页面（/admin/cms）
- [x] 网站设置管理（Logo、标题等）
- [x] 优势说明管理（增删改）
- [x] 服务项目管理（增删改）
- [x] 患者评价管理（增删改）
- [x] 表单字段管理（增删改）

### 8. 表单与多语言
- [x] 首页和联系页表单统一
- [x] 联系页完整翻译支持（中/英/印尼语）
- [x] Footer 链接语言自适应

## 待开发功能
- [ ] 医院合作伙伴展示
- [ ] 成功案例详情页
- [ ] 在线客服聊天功能
- [ ] 预约系统

## 数据库设计

### inquiries 表（客户咨询）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| name | VARCHAR(255) | 姓名 |
| email | VARCHAR(255) | 邮箱 |
| phone | VARCHAR(100) | 电话 |
| country | VARCHAR(100) | 国家 |
| service | VARCHAR(255) | 咨询项目 |
| message | TEXT | 留言内容 |
| created_at | TIMESTAMP | 创建时间 |

### admins 表（管理员）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| email | VARCHAR(255) | 登录邮箱 |
| password | VARCHAR(255) | 密码（加密） |
| created_at | TIMESTAMP | 创建时间 |

### cms_content 表（CMS内容）
| 字段 | 类型 | 说明 |
|------|------|------|
| key | VARCHAR(100) | 内容键（主键） |
| value | JSONB | 内容值（多语言支持） |
| updated_at | TIMESTAMP | 更新时间 |

**CMS Keys 说明**:
| Key | 内容 | 结构 |
|-----|------|------|
| settings | 网站设置 | {logo, siteTitle, heroTitle, heroSubtitle, whatsappNumber, contactEmail, contactPhone} |
| advantages | 优势说明 | [{id, icon, title: {en,zh,id}, description: {en,zh,id}}] |
| services | 服务项目 | [{id, icon, title: {en,zh,id}, description: {en,zh,id}, features: {en:[],zh:[],id:[]}, typicalCost, vsUsCost}] |
| testimonials | 患者评价 | [{id, name, country, treatment, quote: {en,zh,id}, rating}] |
| formFields | 表单字段 | [{id, name, type, label: {en,zh,id}, placeholder: {en,zh,id}, required, options, order}] |

## 需求变更记录

| 日期 | 变更内容 | 确认状态 |
|------|----------|----------|
| 2026-04-11 | 初始官网需求 | 已完成部署 |
| 2026-04-11 | 增加多语言支持（中/英/印尼语） | 已完成 |
| 2026-04-11 | 增加 Vercel Postgres 数据库存储表单数据 | 已完成 |
| 2026-04-11 | 增加管理员后台查看客户数据 | 已完成 |
| 2026-04-11 | 增加 Discord 联系方式 | 已添加 |
| 2026-04-13 | 联系页完整翻译支持（使用 i18n） | 已完成 |
| 2026-04-13 | 首页和联系页表单字段统一 | 已完成 |
| 2026-04-13 | Nodemailer SMTP 邮件通知功能 | 已完成 |
| 2026-04-13 | Footer 链接语言自适应修复 | 已完成 |
| 2026-04-13 | CMS 后台内容管理系统 | 已完成 |

## Vercel Postgres 数据库配置

### 步骤 1：创建数据库
1. 登录 Vercel → 项目 → **Storage** → **Create Database**
2. 选择 **Postgres** → 创建
3. 复制 **Connection URL**（格式：`postgres://...`）

### 步骤 2：创建数据表
在 Vercel Storage 数据库的 **Query** 面板中执行以下 SQL：

```sql
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  country VARCHAR(100),
  service VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

CREATE TABLE IF NOT EXISTS cms_content (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 管理员后台
- 登录页面: `/admin/login`
- 数据查看: `/admin/inquiries`
- CMS 管理: `/admin/cms`
- 默认账号: `admin@aikangmedtour.com` / `admin123`

## SMTP 邮件通知配置

用户提交联系表单后，系统会自动发送邮件通知。

### 环境变量配置
在 Vercel 项目设置中添加以下环境变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| SMTP_HOST | SMTP 服务器地址 | smtp.gmail.com |
| SMTP_PORT | SMTP 端口 | 587 |
| SMTP_SECURE | 是否使用 SSL | false |
| SMTP_USER | 发件邮箱 | your-email@gmail.com |
| SMTP_PASS | 邮箱密码/App Password | xxxx xxxx xxxx xxxx |
| SMTP_FROM | 发件人显示名称 | AiKang Medical Tour <your-email@gmail.com> |
| NOTIFICATION_EMAIL | 通知接收邮箱 | info@aikangmedtour.com |

### Gmail 配置说明
1. 登录 Google 账号 → 安全管理 → **两步验证**（必须开启）
2. 进入 **应用密码** → 选择应用（邮件）→ 设备（其他）
3. 生成 16 位应用密码，填入 `SMTP_PASS`

### .env.example 文件
项目根目录包含 `.env.example` 模板文件，可参考配置。
