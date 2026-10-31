# DATA_REQUIRED.md — Danh mục Dữ liệu, Hình ảnh & Minh chứng Cần Chủ sở hữu Bổ sung

Tài liệu này liệt kê toàn bộ các trường thông tin, hình ảnh thực tế và bản scan minh chứng chưa có trong kho mã nguồn hiện tại. Tuân thủ nghiêm ngặt quy tắc **Evidence Integrity** của portfolio, hệ thống **không tự suy diễn ngày tháng, danh hiệu, cấp giải, số quyết định hoặc tạo ảnh giả lập bằng AI**.

Khi bạn (Nguyễn Minh Trúc) có sẵn các tư liệu dưới đây, chỉ cần cập nhật tệp ảnh vào `public/media/...` và đổi trạng thái `"status": "verified"` trong `src/content/data/media.json` (cùng các trường tương ứng trong `roles.json`, `journey.json`, `awards.json`).

---

## 1. Phân hệ Roles & Affiliations (`src/content/data/roles.json`)

### 1.1. Tư cách Đảng viên Đảng Cộng sản Việt Nam (`id: "cpv-member"`)
- **Trạng thái hiện tại:** Đã xác nhận tư cách Đảng viên (`roleType: "membership"`, tách biệt hoàn toàn với chức vụ lãnh đạo; hỗ trợ công tắc ẩn/hiện quyền riêng tư `showPoliticalMembershipByDefault`).
- **Thông tin cần bổ sung (nếu muốn công khai một phần):**
  - `startDate`: Năm hoặc tháng/năm kết nạp Đảng chính thức (hiện đang để `null` kèm ghi chú bảo mật).
  - `organization`: Tên Đảng bộ / Chi bộ sinh hoạt (chỉ nên ghi ở mức trường/đơn vị nếu được phép công khai; **tuyệt đối không đưa số thẻ Đảng viên hoặc số quyết định kết nạp lên public web**).
- **Hình ảnh tư liệu (`media-cpv-admission-archive`):**
  - Đường dẫn đề xuất: `/media/roles/cpv-admission.webp` (tỷ lệ khuyến nghị `3:2` hoặc `16:10`, đã xóa/che mọi thông tin định danh nhạy cảm).

### 1.2. CLB Nhà Khởi nghiệp Trẻ — NJEC (`id: "njec-technology-committee"`)
- **Trạng thái hiện tại:** Đã có dữ liệu xác thực từ `experiences.json` (Thành viên Ban Công nghệ từ năm 2025, phát triển Cổng thông tin thành viên NJEC, hỗ trợ tập huấn tháng 07/2026).
- **Thông tin & Media cần bổ sung:**
  - `organizationLogo`: Logo chính thức của CLB NJEC dạng SVG/WebP (`/media/logos/njec.svg` hoặc `/media/logos/njec.webp`).
  - `media-njec-member-portal`: Ảnh chụp màn hình thực tế giao diện **NJEC Member Portal** (đã làm mờ dữ liệu cá nhân của thành viên CLB) tại `/media/roles/njec-member-portal.webp`.
  - `media-njec-activity-training-2026`: Ảnh hoạt động thực tế trong đợt hỗ trợ chương trình tập huấn NJEC đầu tháng 07/2026 tại `/media/journey/njec-training-2026-07.webp`.

### 1.3. NIIC Platform — Trung tâm Sáng tạo và Ươm tạo Khởi nghiệp NTTU (`id: "niic-platform-technical-lead"`)
- **Trạng thái hiện tại:** Đã có đầy đủ ảnh giao diện thực tế (`/media/projects/niic-platform/hero.webp`), sơ đồ kiến trúc (`/media/projects/niic-platform/architecture.webp`) và liên kết vận hành thực tế (`https://nttu.startup.niic.vn`).
- **Thông tin & Media có thể bổ sung thêm:**
  - `organizationLogo`: Logo chính thức của NIIC / NTTU (`/media/logos/niic.webp`).
  - Ảnh chụp nhóm phát triển (2 thành viên) hoặc buổi họp triển khai/nghiệm thu tại NIIC (`/media/roles/niic-team.webp`).

---

## 2. Phân hệ My Journey (`src/content/data/journey.json`)

| ID Hoạt động | Trường / Tư liệu đang chờ bổ sung | File mục tiêu đề xuất |
|---|---|---|
| `journey-njec-training-2026-07` | Ngày diễn ra cụ thể trong đầu tháng 07/2026; album ảnh hoạt động tập huấn thực tế; link bài truyền thông fanpage NJEC (nếu có). | `/media/journey/njec-training-2026-07.webp` |
| `journey-joined-njec-2025` | Tháng gia nhập cụ thể trong năm 2025; ảnh chụp giao diện NJEC Member Portal; ảnh sinh hoạt Ban Công nghệ. | `/media/roles/njec-member-portal.webp` |
| `journey-hackathon-lotus-seed-2025` | Tên chính thức của cuộc thi Hackathon sinh viên năm 2025; đơn vị tổ chức; ngày/tháng thi; ảnh nhóm 3 thành viên lúc thuyết trình. | `/media/journey/lotus-seed-hackathon-2025.webp` |
| `journey-cpv-membership-milestone` | Năm/tháng kết nạp chính thức (nếu chủ sở hữu muốn hiển thị mốc năm chính xác trên timeline); ảnh kỷ niệm lễ kết nạp. | `/media/roles/cpv-admission.webp` |
| `journey-information-systems-education` | Niên khóa bắt đầu – dự kiến tốt nghiệp; tên trường Đại học chính thức nếu muốn hiển thị trực tiếp trên mục Academic Journey. | `src/content/data/journey.json` |

---

## 3. Phân hệ Honors & Awards (`src/content/data/awards.json`)

Tuân thủ yêu cầu **không tự tạo giải thưởng, danh hiệu hoặc bộ đếm thành tích giả**:

1. **Hackathon Sinh viên 2025 — Hệ thống Phân loại Hạt sen (`id: "recognition-lotus-seed-hackathon-2025"`):**
   - Hiện đang phân loại trung thực ở mức `awardType: "participation"` (Chứng nhận tham gia & Điều phối nhóm).
   - **Cần bổ sung:** Tên giải thưởng/danh hiệu chính thức (nếu đạt giải), tên Ban Tổ chức chính thức, cấp cuộc thi (`institutional` / `local` / `national`), và bản scan giấy chứng nhận hoặc ảnh nhận giải tại `/media/certificates/lotus-seed-hackathon-2025.webp` (giữ nguyên tỷ lệ gốc của giấy chứng nhận).
2. **Ghi nhận Đóng góp Ban Công nghệ NJEC (`id: "recognition-njec-tech-contribution"`):**
   - **Cần bổ sung:** Bản scan Giấy chứng nhận / Giấy khen hoạt động CLB (nếu có) tại `/media/certificates/njec-contribution.webp`.
3. **Thành tích Học tập (`category: "academic"`) & Chứng chỉ Đào tạo (`category: "certifications"`):**
   - Hiện đang hiển thị trạng thái minh bạch *"Chưa công bố mục nào đã xác thực trong nhóm này"* để không tạo dữ liệu giả.
   - **Cần bổ sung:** Danh sách học bổng, giấy khen sinh viên giỏi, chứng chỉ ngoại ngữ/chuyên môn (Coursera, Google, AWS, IELTS/TOEIC...) kèm:
     - Tên chứng chỉ / giải thưởng (`title`)
     - Đơn vị cấp (`organizer`)
     - Ngày cấp (`awardDate`)
     - Link xác thực trực tuyến (`verificationUrl`)
     - Ảnh bản scan giữ nguyên tỷ lệ gốc (`certificateImage`) đã che số CCCD/CMND hoặc mã cá nhân nhạy cảm.

---

## 4. Quy trình Cập nhật Nhanh Khi Có Dữ liệu Mới

1. Đặt file ảnh định dạng `.webp` hoặc `.avif` vào thư mục tương ứng trong `public/media/`.
2. Khai báo hoặc cập nhật mục tương ứng trong `src/content/data/media.json` với `"src": "/media/..."` và `"status": "verified"`.
3. Cập nhật thông tin chi tiết trong `src/content/data/roles.json`, `src/content/data/journey.json` hoặc `src/content/data/awards.json`.
4. Chạy lệnh kiểm tra tính toàn vẹn dữ liệu và liên kết ID:
   ```bash
   npm run validate-data
   npm run build
   ```
