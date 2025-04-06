// src/utils/dateUtils.ts

export const formatDate = (timestamp: number | string | Date): string => {
  // Chuyển đổi timestamp thành Date object
  const date = new Date(
    typeof timestamp === "string" ? parseInt(timestamp) : timestamp
  );

  // Lấy các thành phần ngày tháng
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // "yyyy-MM-dd"
};

export const formatDateTime = (timestamp: number | string | Date): string => {
  const date = new Date(
    typeof timestamp === "string" ? parseInt(timestamp) : timestamp
  );

  // Options cho định dạng ngày giờ
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Sử dụng định dạng 12 giờ (AM/PM)
  };

  return date.toLocaleString("en-US", options);
};

// Hoặc nếu muốn format 24 giờ:
/*
  export const formatDateTime = (timestamp: number | string): string => {
    const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) : timestamp);
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Sử dụng định dạng 24 giờ
    };
    
    return date.toLocaleString('en-US', options);
    // Ví dụ kết quả: "March 14, 2023, 14:59:32"
  };
  */
