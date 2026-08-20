# QR 출석 시스템 설정

## 1. Supabase

Supabase Dashboard의 **SQL Editor**에서 `supabase-setup.sql` 전체를 다시 실행합니다. 기존 공지사항 테이블은 유지되고, 출석용 테이블만 추가됩니다.

## 2. Vercel 환경 변수

Vercel 프로젝트의 **Settings → Environment Variables**에 아래 값을 Production과 Preview에 추가합니다.

| 이름 | 값 |
| --- | --- |
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Supabase Publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase의 `service_role` secret key |
| `ADMIN_EMAIL` | `digital@ktc.ac.kr` |
| `ALLOWED_PC_RANGES` | `[["211.253.246.211","211.253.246.250"],["211.253.246.61","211.253.246.110"]]` |
| `ALLOWED_WIRELESS_RANGES` | 무선망 공인 IP를 받은 뒤 추가. 예: `[["203.0.113.10","203.0.113.20"]]` |

`SUPABASE_SERVICE_ROLE_KEY`는 비밀 키입니다. 웹페이지 코드나 채팅에 붙여 넣지 않습니다.

## 3. 운영 순서

1. `admin.html`에서 로그인 후 **출석 관리**를 선택합니다.
2. 수강생 명단 CSV를 과목별로 업로드합니다. 첫 행은 `학번,이름,휴대폰번호`입니다.
3. 과목·주차·교시를 선택해 30초 출석을 시작합니다.
4. 강의실 PC에서 6자리 코드를 입력하거나, QR을 통해 출석합니다.
5. 출석현황에서 공란(출석)과 `/`(결석)을 확인하고 CSV를 내려받습니다.

## 네트워크 주의

`192.168.100.35`, `192.168.100.36`은 사설 AP 관리 IP입니다. Vercel은 이를 볼 수 없으므로 무선 출석을 활성화하려면 전산팀에서 무선망의 **공인 인터넷 출구 IP 범위**를 받아야 합니다.
