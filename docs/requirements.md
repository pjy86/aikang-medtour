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
- [x] Vercel Forms 表单数据收集（已废弃）
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

## 需求变更记录

| 日期 | 变更内容 | 确认状态 |
|------|----------|----------|
| 2026-04-11 | 初始官网需求 | 已完成部署 |
| 2026-04-11 | 增加多语言支持（中/英/印尼语） | 已完成 |
| 2026-04-11 | 增加 Vercel Postgres 数据库存储表单数据 | 已完成 |
| 2026-04-11 | 增加管理员后台查看客户数据 | 已完成 |
| 2026-04-11 | 增加 Discord 联系方式 | 已添加 |

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
```

或使用 `scripts/create-table.sql` 文件。

### 步骤 3：连接数据库
Vercel 会自动设置 `POSTGRES_URL` 环境变量，代码无需修改。

### 管理员后台
- 登录页面: `/admin/login`
- 数据查看: `/admin/inquiries`
- 默认账号: `admin@aikangmedtour.com` / `admin123`