# TANSTACK QUERY V5

# Overview

- [Introduction](#introduction)
- [Important Defaults](#importantdefaults)

- [Getting Started](#getting-started)
- [Contribution](#contribution)
- [License](#license)

## Introduction

TanStack Query (trước đây là React Query) thường được mô tả là thư viện lấy dữ liệu còn thiếu sót cho các ứng dụng web,
nhưng theo các thuật ngữ kỹ thuật hơn, nó giúp việc lấy dữ liệu, caching, đồng bộ hóa và cập nhật trạng thái máy chủ
trong ứng dụng web của bạn trở nên dễ dàng hơn.

Động lực
Hầu hết các framework web cốt lõi không đi kèm với cách cụ thể để lấy hoặc cập nhật dữ liệu theo cách toàn diện. Do đó,
các nhà phát triển thường xây dựng các meta-frameworks hoặc phát minh cách riêng của họ để lấy dữ liệu. Điều này thường
đồng nghĩa với việc kết hợp trạng thái dựa trên thành phần và tác động phụ hoặc sử dụng các thư viện quản lý trạng thái
mục đích chung hơn để lưu trữ và cung cấp dữ liệu không đồng bộ trong ứng dụng của họ.

Trong khi hầu hết các thư viện quản lý trạng thái truyền thống là tuyệt vời để làm việc với trạng thái của máy khách,
chúng không thực sự tốt khi làm việc với trạng thái không đồng bộ hoặc máy chủ. Điều này bởi vì trạng thái máy chủ khác
hoàn toàn. Để bắt đầu, trạng thái máy chủ:

Được lưu trữ từ xa tại một vị trí bạn không kiểm soát hoặc sở hữu
Yêu cầu các API không đồng bộ để lấy và cập nhật
Đòi hỏi sự sở hữu chia sẻ và có thể được thay đổi bởi những người khác mà không cần sự hiểu biết của bạn
Có thể trở thành "lỗi thời" trong ứng dụng của bạn nếu bạn không cẩn thận
Khi bạn nắm được bản chất của trạng thái máy chủ trong ứng dụng của mình, thách thức sẽ xuất hiện nhiều hơn khi bạn tiến
xa hơn, ví dụ:
Caching... (có thể là điều khó nhất trong lập trình)
Loại bỏ các yêu cầu trùng lặp cho cùng một dữ liệu vào một yêu cầu duy nhất
Cập nhật dữ liệu "lỗi thời" trong nền
Biết khi nào dữ liệu "lỗi thời"
Phản ánh các cập nhật vào dữ liệu càng nhanh càng tốt
Tối ưu hiệu suất như phân trang và tải dữ liệu lười biếng
Quản lý bộ nhớ và thu gom rác của trạng thái máy chủ
Ghi nhớ lại kết quả truy vấn với chia sẻ cấu trúc
Nếu bạn không bị áp đảo bởi danh sách đó, điều đó phải có nghĩa là bạn đã giải quyết tất cả các vấn đề trạng thái máy
chủ của mình rồi và xứng đáng nhận một giải thưởng. Tuy nhiên, nếu bạn giống như phần lớn mọi người, bạn hoặc chưa giải
quyết hoặc giải quyết được hầu hết các thách thức này và chúng tôi chỉ mới bắt đầu!
React Query một cách rõ ràng là một trong những thư viện tốt nhất để quản lý trạng thái máy chủ. Nó hoạt động tuyệt vời
ngay khi bạn bắt đầu, không cần cấu hình, và có thể được tùy chỉnh theo ý thích của bạn khi ứng dụng của bạn phát triển.

React Query cho phép bạn vượt qua và khắc phục các thách thức và rào cản khó khăn của trạng thái máy chủ và kiểm soát dữ
liệu ứng dụng của bạn trước khi nó bắt đầu kiểm soát bạn.

Theo một ghi chú kỹ thuật hơn, React Query có thể:

Giúp bạn loại bỏ nhiều dòng mã phức tạp và hiểu lầm từ ứng dụng của bạn và thay thế bằng chỉ một vài dòng mã logic React
Query.
Làm cho ứng dụng của bạn dễ bảo trì hơn và dễ dàng xây dựng tính năng mới mà không cần lo lắng về việc kết nối các nguồn
dữ liệu trạng thái máy chủ mới
Có một tác động trực tiếp đến người dùng cuối của bạn bằng cách làm cho ứng dụng của bạn cảm thấy nhanh hơn và phản hồi
hơn bao giờ hết.
Có thể giúp bạn tiết kiệm băng thông và tăng hiệu suất bộ nhớ

## ImportantDefaults

Mặc định, TanStack Query được cấu hình với các giá trị mặc định quyết đoán nhưng hợp lý. Đôi khi những giá trị mặc định
này có thể làm người dùng mới bất ngờ hoặc làm cho việc học/học lập trình khó khăn nếu họ không biết về chúng. Hãy nhớ
đến chúng khi bạn tiếp tục học và sử dụng TanStack Query:

Các phiên của truy vấn thông qua useQuery hoặc useInfiniteQuery theo mặc định xem dữ liệu đã được lưu trong cache là lỗi
thời.
Để thay đổi hành vi này, bạn có thể cấu hình truy vấn của mình cả toàn cầu và truy vấn cụ thể bằng cách sử dụng tùy chọn
staleTime. Chỉ định một staleTime dài hơn có nghĩa là các truy vấn sẽ không lấy dữ liệu của họ lại nhiều lần.

Các truy vấn lỗi thời được lấy lại tự động trong nền khi:

- Các phiên mới của truy vấn được gắn kết
- Cửa sổ được làm mới tiêu điểm
- Mạng được kết nối lại
- Truy vấn được tùy chọn cấu hình với một khoảng thời gian lấy lại tùy chọn
- Để thay đổi chức năng này, bạn có thể sử dụng các tùy chọn như refetchOnMount, refetchOnWindowFocus,
  refetchOnReconnect
  và refetchInterval.

Kết quả của truy vấn mà không còn các phiên hoạt động của useQuery, useInfiniteQuery hoặc truy vấn quan sát được gán
nhãn là "không hoạt động" và vẫn tồn tại trong bộ nhớ cache trong trường hợp chúng được sử dụng lại sau này.
Mặc định, các truy vấn "không hoạt động" được thu gom rác sau 5 phút.

Để thay đổi điều này, bạn có thể điều chỉnh thời gian gcTime mặc định cho các truy vấn thành một thời gian khác ngoài
1000 * 60 * 5 milliseconds.
Các truy vấn thất bại được thử lại một cách im lặng 3 lần, với độ trễ lũy tiến theo hàm backoff trước khi ghi lại và
hiển thị một lỗi cho UI.

Để thay đổi điều này, bạn có thể điều chỉnh các tùy chọn retry và retryDelay mặc định cho các truy vấn thành một giá trị
khác ngoài 3 và hàm backoff mặc định theo cấp số nhân.
Kết quả truy vấn theo mặc định được chia sẻ cấu trúc để xác định xem dữ liệu có thực sự thay đổi hay không và nếu không,
tham chiếu dữ liệu vẫn không thay đổi để hỗ trợ tốt hơn cho việc ổn định giá trị với useMemo và useCallback. Nếu khái
niệm này nghe lạ lẫm, thì đừng lo lắng! 99.9% thời gian bạn sẽ không cần phải vô hiệu hóa điều này và nó làm cho ứng
dụng của bạn hoạt động tốt hơn mà không tốn kém gì cho bạn.

Chia sẻ cấu trúc chỉ hoạt động với các giá trị tương thích JSON, bất kỳ loại giá trị nào khác sẽ luôn được coi là đã
thay đổi. Nếu bạn gặp vấn đề về hiệu suất vì các phản hồi lớn chẳng hạn, bạn có thể vô hiệu hóa tính năng này bằng cờ
config.structuralSharing. Nếu bạn đang xử lý các giá trị không tương thích JSON trong các phản hồi truy vấn của mình và
vẫn muốn xác định xem dữ liệu đã thay đổi hay không, bạn có thể cung cấp hàm tùy chỉnh của riêng mình như
config.structuralSharing để tính toán một giá trị từ các phản hồi cũ và mới, giữ tham chiếu như cần thiết.