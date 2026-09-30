export const host = window.location.origin + '/dgbas_api'
// export const host = 'http://localhost/dgbas_api/'
export const RequetURL = {
  ajaxurl: host + '/Common_Inquire.ashx',
  exporturl: host + '/ExportExcel.ashx',
  exporturl2: host + '/ExportExcel2.ashx',
  exportodsurl: host + '/ExportOds.ashx',
  majaxurl: host + '/More_Inquire.ashx',
  cityaxurl: host + '/City_Inquire.ashx',
  taiwanaxurl: host + '/Taiwan_Inquire.ashx',
  cityinurl: host + '/City_Inquire_Intranet.ashx',
  monthlyurl: host + '/MonthlyReport.ashx',
  defpdfurl: host + '/編制方法與名詞定義.pdf',
  backurl: host + '/AjaxDataUtil.ashx',
  exportpdf: host + '/ExportPdf.ashx',
  tabledownload: host + '/ExportExcel/',
  yearreportdownload: host + '/ExportYearReport/',
  imageupload: host + '/uploadimage/',
  compdfurl: host + '/就業及失業統計資料查詢系統-相容性設定文件.pdf',
  isLogin: false
}
