// Supabase의 publishable key는 브라우저에서 사용하도록 설계된 공개 키입니다.
// 데이터 보호는 Supabase의 RLS 정책(supabase-setup.sql)으로 처리합니다.
window.supabaseClient = window.supabase.createClient(
  "https://crgiruqljhcwgeopzdts.supabase.co",
  "sb_publishable__syfR403CGNxyYJFXZDVXw_DF7Y0IA1"
);
