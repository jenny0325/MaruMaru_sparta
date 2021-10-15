$(function () {
    $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        nextText: '다음 달',
        prevText: '이전 달',
        dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
        dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    });
    $("#anim").on("change", function () {
        $("#datepicker").datepicker("option", "showAnim", $(this).val());
    });
})

function save_event_upload() {
    const new_id = $("#idx").val()
    const new_title = $("#title_box").val()
    const new_address = $("#address-box").val()
    const new_content = $("#contents_box").val()
    const new_date = $("#datepicker").val()
    const new_max = $("#max-people").val()

    if (new_title.length == 0) {
        alert("제목을 입력해주세요.");
        return;
    }
    if (new_content.length == 0) {
        alert("수정 내용을 입력해주세요.");
        return;
    }
    if (new_date.length == 0) {
        alert("수정 내용을 입력해주세요.");
        return;
    }
    if (new_max.length == 0) {
        alert("수정 내용을 입력해주세요.");
        return;
    }

    $.ajax({
        type: "PUT",
        url: `/event/detail`,
        data: {
            id_give: new_id,
            title_give: new_title,
            contents_give: new_content,
            address_give: new_address,
            date_give: new_date,
            max_give: new_max
        },
        success: function (response) {
            alert(response["msg"])
            window.location.href = `/event/detail/${new_id}`
        },
        error: function (request, status, error) {
            alert(error);
        }
    });
}

function address_input() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraRoadAddr !== '') {
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            // document.getElementById('sample4_postcode').value = data.zonecode;
            // document.getElementById("sample4_roadAddress").value = roadAddr;
            // document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
            document.getElementById("address-box").value = roadAddr;
        }
    }).open();
};