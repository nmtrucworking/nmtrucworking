# Portfolio Media Directory Architecture

Thư mục `public/media/` quản lý toàn bộ tài sản hình ảnh thực tế và minh chứng của portfolio, được chuẩn hóa theo cấu trúc sẵn sàng chuyển đổi sang Cloudflare R2 hoặc CDN object storage:

```text
public/media/
├── projects/         # Ảnh chụp giao diện & sơ đồ kiến trúc của các dự án (WebP)
│   ├── niic-platform/
│   ├── senova/
│   ├── operations-hub/
│   ├── pronaflow/
│   └── vocelune/
├── roles/            # Ảnh hoạt động tổ chức, ban chuyên môn và vai trò cá nhân
├── journey/          # Ảnh tư liệu sự kiện, tập huấn, hackathon theo dòng thời gian
├── certificates/     # Bản scan bằng khen, giấy chứng nhận (giữ nguyên tỷ lệ gốc)
└── logos/            # Logo vector/WebP của tổ chức, câu lạc bộ, đơn vị
```

## Quy tắc quản lý Media Asset (`src/content/data/media.json`)

1. **Mọi ảnh đều phải khai báo qua `src/content/data/media.json`** với đầy đủ `id`, `src`, `alt` (EN/VI), `caption` (EN/VI), `width`, `height`, `type`, `credits`, `visibility` (`public`/`private`) và `status` (`verified`/`pending-upload`).
2. **Không dùng ảnh AI tạo ra** cho hoạt động cá nhân, sự kiện hoặc chứng nhận. Khi chưa có ảnh thật, đặt `"src": null` và `"status": "pending-upload"` để giao diện hiển thị khung chờ minh chứng chuẩn mực.
3. **Bảo mật thông tin nhạy cảm:** Trước khi đưa ảnh giấy chứng nhận hoặc quyết định kết nạp vào `public/media/certificates/`, cần che/xóa số CCCD, số thẻ Đảng viên, số điện thoại hoặc địa chỉ riêng tư.
