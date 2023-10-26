<!-- main => index -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>

<div class="wrap main">
    <%@ include file="/WEB-INF/views/eatout/include/navbar.jsp" %>
    <script>
        $(function(){
            var param = {};
            $('#btn_success').click(function(){
                console.log('계산기 시작');
                param.toojaCost1 = $('#tooja_cost1').val();
                param.toojaCost2 = $('#tooja_cost2').val();
                param.toojaCost3 = $('#tooja_cost3').val();
                param.toojaCost4 = $('#tooja_cost4').val();
                param.toojaCost5 = $('#tooja_cost5').val();
                param.toojaCost6 = $('#tooja_cost6').val();
                param.operCost1 = $('#oper_cost1').val();
                param.operCost2 = $('#oper_cost2').val();
                param.operCost3 = $('#oper_cost3').val();
                param.operCost4 = $('#oper_cost4').val();
                param.dangaCost = $('#danga_cost').val();
                if($('#tooja_cost1').val() == 0){
                    alert('권리금이 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }else if($('#tooja_cost2').val() == 0){
                    alert('보증금이 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }else if($('#tooja_cost3').val() == 0){
                    alert('대출금이 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }else if($('#tooja_cost4').val() == 0){
                    alert('이자율이 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }else if($('#tooja_cost5').val() == 0){
                    alert('기타 투자비가 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }else if($('#tooja_cost6').val() == 0){
                    alert('리뉴얼예상기간이 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }else if($('#oper_cost1').val() == 0){
                    alert('월세가 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }else if($('#oper_cost2').val() == 0){
                    alert('인건비가 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }else if($('#oper_cost3').val() == 0){
                    alert('재료비가 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }else if($('#oper_cost4').val() == 0){
                    alert('기타비용이 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }else if($('#danga_cost').val() == 0){
                    alert('객단가가 입력되지 않았습니다.\n금액을 입력해주시기 바랍니다.');
                    return;
                }
                console.log(param)
                getAjax("getVacancyList", "/agile/main/getFoundationCalc",param, fn_calcInfo, fn_error);
            })
            $('#btn_clear').click(function(){
                clearVal();
            })

            $('#rent_area1').keyup(function(){
                console.log($(this).val());
                $('#rent_area2').val(common.round($(this).val()*3.305785,1));
            })
            $('#area1').keyup(function(){
                console.log($(this).val());
                $('#area2').val(common.round($(this).val()*3.305785,1));
            })

            // 전지역 업종 증감률 리스트
            function fn_calcInfo(id, response, param){

                console.log(response);
                var template = $('#tmp_calc_diff').html();
                var templateScript = Handlebars.compile(template);
                var context = response.data[0];
                var html = templateScript(context);
                $('#calc_diff').html(html);

                $('#btn_success').text("수정");
                $('.calc_section02').removeClass('disabled');
                $('.calc_section02').addClass('active');

                if($('.calc_section02').hasClass('active')){
                    $('.calc_tab02 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon02_on.svg')
                }else{
                    $('.calc_tab02 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon02_bk.svg')
                }
            }
            function clearVal(){
                console.log('초기화 실행');
                $('#tooja_cost1').val(0);
                $('#tooja_cost2').val(0);
                $('#tooja_cost3').val(0);
                $('#tooja_cost4').val(0);
                $('#tooja_cost5').val(0);
                $('#tooja_cost6').val(0);
                $('#oper_cost1').val(0);
                $('#oper_cost2').val(0);
                $('#oper_cost3').val(0);
                $('#oper_cost4').val(0);
                $('#danga_cost').val(0);
                $('#btn_success').text("입력 완료")
                $('#calc_diff').remove();
                $('.calc_section02').removeClass('active');
                $('.calc_section01').addClass('active');
            }


            $('.navList li:nth-child(4)').addClass('active');
            $('.navList li:nth-child(4) img').attr({src:'/eatout/assets/eatout/images/icon/tab04_icon_on.svg'})


            $('.calc_com_tab').click(function(){
                $(this).parent().toggleClass('active');

                if($('.calc_section01').hasClass('active')){
                    $('.calc_tab01 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon01_on.svg')
                }else{
                    $('.calc_tab01 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon01_off.svg')
                }

                if($('.calc_section02').hasClass('active')){
                    $('.calc_tab02 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon02_on.svg')
                }else{
                    $('.calc_tab02 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon02_bk.svg')
                }

            });

            // $('.calc_section01 .calc_btnBox button').click(function(){
            //     // $('.calc_section02').removeClass('disabled');
            //     // $('.calc_section02').addClass('active');
            //
            //     if($('.calc_section02').hasClass('active')){
            //         $('.calc_tab02 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon02_on.svg')
            //     }else{
            //         $('.calc_tab02 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon02_bk.svg')
            //     }
            // });


        });

    </script>
<!--
*공통*
로그인 전 / 후 구분
class = "login_none" 제거 및 추가
-->
    <div class="com_gridInner">
        <div class="calc_container">
            <div class="calcBox">
                <p class="calcTit">창업 비용 계산기</p>
                <p class="calc_sText">세부 정보를 정확하게 입력할수록 더 정확한 결과 값을 얻을 수 있습니다.</p>

                <section class="calc_content calc_section01 active">
                    <div class="calc_tab01 calc_com_tab">
                        <img src="/eatout/assets/eatout/images/icon/calc_tab_icon01_off.svg" alt="비용 입력 아이콘"/>
                        <p class="calc_tab_text">비용 입력</p>
                    </div>

                    <div class="calc_inner">
<%--                        <div class="calc_inner_cont">--%>
<%--                            <p class="calc_in_tit01">물건정보</p>--%>
<%--                            <table class="w4_table">--%>
<%--                                <tr>--%>
<%--                                    <th>임대 면적</th>--%>
<%--                                    <td>--%>
<%--                                        <input type="text" class="calc_input" placeholder="0" id="rent_area1"/> <span>평</span>--%>
<%--                                        <input type="text" class="calc_input disabled" placeholder="0" id="rent_area2"/> <span>m²</span>--%>
<%--                                    </td>--%>
<%--                                    <th>실 면적</th>--%>
<%--                                    <td>--%>
<%--                                        <input type="text" class="calc_input" placeholder="0" id="area1"/> <span>평</span>--%>
<%--                                        <input type="text" class="calc_input disabled" placeholder="0" id="area2"/> <span>m²</span>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>
<%--                            </table>--%>
<%--                        </div>--%>
                        <div class="calc_inner_cont">
                            <p class="calc_in_tit01">초기 투자비용</p>
                            <table class="w4_table">
                                <tr>
                                    <th>권리금</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0" id="tooja_cost1"/> <span>만원</span>
                                    </td>
                                    <th>보증금</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0" id="tooja_cost2"/> <span>만원</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>기타 투자비 <span>설비, 인테리어, 교육비, 가맹비 등</span></th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0" id="tooja_cost5"/> <span>만원</span>
                                    </td>
                                    <th>리뉴얼 예상기간 <span>감가상각</span></th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0" id="tooja_cost6"/> <span>만원</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>대출금 / 이자</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0" id="tooja_cost3"/> <span>만원</span>
                                        <span class="g4_col">/</span>
                                        <input type="text" class="calc_input" placeholder="0" id="tooja_cost4"/> <span>%</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="calc_inner_cont">
                            <p class="calc_in_tit02">월 운영비용</p>
                            <table class="w4_table">
                                <tr>
                                    <th>월세</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0" id="oper_cost1"/> <span>만원</span>
                                    </td>
                                    <th>인건비</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0" id="oper_cost2"/> <span>만원</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>재료비</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0" id="oper_cost3"/> <span>만원</span>
                                    </td>
                                    <th>기타비용<span>공과잡비 등</span></th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0" id="oper_cost4"/> <span>만원</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="calc_inner_cont">
                            <p class="calc_in_tit02">객단가</p>
                            <table class="w4_table">
                                <tr>
                                    <th>객단가</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0" id="danga_cost"/> <span>만원</span>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div class="calc_btnBox">
                            <div>
                                <button type="reset" class="wh_btn" id="btn_clear">입력 초기화</button>
                            </div>
                            <div>
                                <button type="submit" class="bk_btn" id="btn_success">입력 완료</button>
                            </div>
<%--                            <div>--%>
                                <!--수정 버튼-->
<%--                                <button type="button" class="bk_btn" id="btn_success">수정</button>--%>

                                <!--수정 완료 버튼-->
                                <%--                                <button type="reset" class="wh_btn">취소</button>--%>
                                <%--                                <button type="button" class="pr_btn">수정 완료</button>--%>

<%--                            </div>--%>
                        </div>

                    </div>
                </section>

                <section class="calc_content calc_section02 disabled "><!--disabled-->
                    <div id="calc_diff"></div>
                </section>
                <div class="calc_fb_text">
                    <img src="/eatout/assets/eatout/images/icon/line_icon.svg" alt=""/>
                    <p>본 계산기는 참고용 이므로 실제 결과와 상이할 수 있습니다.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/x-handlebars-template" id="tmp_calc_diff">
    <div class="calc_tab02 calc_com_tab ">
        <img src="/eatout/assets/eatout/images/icon/calc_tab_icon02_bk.svg" alt="비용 입력 아이콘"/>
        <p class="calc_tab_text">수익성 시뮬레이션</p>
    </div>
    <div class="calc_inner">
        <div class="calc_inner_cont">
            <p class="calc_in_tit01">예상 창업 비용 분석 결과</p>

            <div class="calc02_gBox mb64">
                <div class="flex">
                    <div>
                        <p class="calc_in_tit02">월 고정 비용 <span>소계 <span>{{sum1}}</span> 만원</span></p>
                        <ul class="calc02_ul">
                            <li>
                                <p>월세</p>
                                <p><span>{{cost1}}</span> 만원</p>
                            </li>
                            <li>
                                <p>인건비</p>
                                <p><span>{{cost2}}</span> 만원</p>
                            </li>
                            <li>
                                <p>초기투자비에 대한 월 발생비용</p>
                                <p><span>{{cost3}}</span> 만원</p>
                            </li>
                            <li>
                                <p>기타비용</p>
                                <p><span>{{cost4}}</span> 만원</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p class="calc_in_tit02">월 변동 비용 <span>소계 <span>{{sum2}}</span> 만원</span></p>
                        <ul class="calc02_ul">
                            <li>
                                <p>재료비</p>
                                <p><span>{{cost5}}</span> 만원</p>
                            </li>
                            <li>
                                <p>인건비 (변동인력)</p>
                                <p><span>{{cost6}}</span> 만원</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="mt40">
                    <p class="calc_in_tit02">총 비용</p>

                    <table class="pr_table">
                        <colgroup>
                            <col width="50%"/>
                            <col width="50%"/>
                        </colgroup>
                        <tr>
                            <th>총 비용 (세전)</th>
                            <th>총 비용 (세후) = 손익분기점</th>
                        </tr>
                        <tr>
                            <td><span class="bk_col">{{total1}}</span> 만원</td>
                            <td><span class="pr_col">{{total2}}</span> 만원</td>
                        </tr>
                    </table>
                </div>
            </div>

            <p class="calc_in_tit01">사업타당성 지표</p>
            <p class="calc_in_tit03">
                입력하신 초기투자 비용과 월 운영비용을 기준으로 수익성을 분석/진단한 결과, <span>일 평균 {{cost10}}, {{cost11}}명의 고객</span>을 유치하여
                <span>월 {{cost9}}만원의 매출</span>을 올리는 지점이 사업타당성 판단 지표인 것으로 분석되었습니다.
            </p>

            <div class="w3_gBox">
                <div>
                    <p>일 평균 매출</p>
                    <p><span>{{cost10}}</span> 만원</p>
                </div>
                <div>
                    <p>일 평균 고객 수</p>
                    <p><span>{{cost11}}</span> 명</p>
                </div>
                <div>
                    <p>월 평균 매출</p>
                    <p><span>{{cost9}}</span> 만원</p>
                </div>
            </div>

            <table class="pr_table prt_v2">
                <colgroup>
                    <col width="22%"/>
                    <col width="26%"/>
                    <col width="26%"/>
                    <col width="26%"/>
                </colgroup>
                <tr>
                    <th></th>
                    <th>손익분기점</th>
                    <th>사업타당성 지표<br/>(투자비 대비월 3% 수익률)</th>
                    <th>2년 내 투자비 회수<br/>(투자비 대비월 4.2% 수익률)</th>
                </tr>
                <tr>
                    <td>월 목표 매출</td>
                    <td>{{total2}}만원</td>
                    <td>{{cost9}}만원</td>
                    <td>{{cost12}}만원</td>
                </tr>
                <tr>
                    <td>일 목표 매출 <span>* 30일 기준</span></td>
                    <td>{{cost7}}만원</td>
                    <td>{{cost10}}만원</td>
                    <td>{{cost13}}만원</td>
                </tr>
                <tr>
                    <td>일 목표 고객 수 <span>* 30일 기준</span></td>
                    <td>{{cost8}}명</td>
                    <td>{{cost11}}명</td>
                    <td>{{cost14}}명</td>
                </tr>
            </table>
        </div>
    </div>
</script>
