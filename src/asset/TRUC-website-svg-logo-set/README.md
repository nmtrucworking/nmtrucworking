# TRÚC. — Website SVG Logo Set

## Thành phần

- `01-truc-wordmark-*`: wordmark dùng trong hero, footer và màn hình giới thiệu.
- `02-truc-primary-lockup-*`: logo đầy đủ kèm tên cá nhân và định vị `DATA / SYSTEMS / PRODUCT`.
- `03-truc-monogram-*`: logo thu gọn cho header responsive.
- `04-truc-icon-*`: app icon hoặc social avatar.
- `05-favicon.svg`: favicon tối ưu cho kích thước nhỏ.
- `06-truc-monochrome-*`: phiên bản đơn sắc cho in ấn, mask và nền đặc biệt.
- `07-safari-pinned-tab.svg`: icon mask đơn sắc cho Safari.
- `logo-assets.css`: biến màu và class CSS cơ bản.
- `preview.html`: trang kiểm tra toàn bộ tài sản.

## Màu thương hiệu

| Token | Hex |
|---|---|
| Charcoal | `#0D0D0F` |
| Graphite | `#282B2F` |
| Ivory | `#F7F7F2` |
| Accent Gold | `#D4A75A` |

## Cách dùng

```html
<img
  src="/brand/02-truc-primary-lockup-dark.svg"
  class="brand-logo"
  width="700"
  height="236"
  alt="TRÚC — Nguyễn Minh Trúc"
/>

<link rel="icon" type="image/svg+xml" href="/brand/05-favicon.svg">
<link rel="mask-icon" href="/brand/07-safari-pinned-tab.svg" color="#0D0D0F">
```

Các ký tự đã được chuyển thành vector path, do đó SVG không yêu cầu cài font Inter trên thiết bị người xem.
