<template>
  <v-container>
    <div class="modal-header AllCenter">
      <label>名詞與定義</label>
    </div>
    <div class="modal-body">
      <div class="modalimgs AllCenter">
        <img src="@/assets/images/Common_Inquire/勞動力分類.svg" alt="" />
      </div>
      <div class="modaltable">
        <table class="detailtable">
          <caption style="display: none;"></caption>
          <thead style="display: none;">
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>15歲以上<br />民間人口</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/15歲以上民間人口.svg"
                  alt=""
                  style="width: 65px;"
                />
              </td>
              <td>
                <span>
                  15 歲以上本國人口扣除武裝勞動力（現役軍人）、監管人口與
                  失蹤人口，包括勞動力與非勞動力。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>勞動力</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/民間勞動力.svg"
                  alt=""
                  style="width: 55px;"
                />
              </td>
              <td>
                <span>
                  指在資料標準週內年滿 15
                  歲可以工作之民間人口，包括就業者及失業者。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>就業者</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/就業者.svg"
                  alt=""
                  style="width: 20px; height: 55px;"
                />
              </td>
              <td>
                <span>
                  指在資料標準週內年滿 15 歲從事有酬工作者，或從事
                  15小時以上之無酬家屬工作者。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>失業者</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/失業者.svg"
                  alt=""
                  style="width: 55px; height: 50px;"
                />
              </td>
              <td>
                <span>
                  指在資料標準週內年滿 15 歲同時具有下列條件者：
                  1.無工作；2.隨時可以工作；3.正在尋找工作或已找工作在等待結果。此外，尚包括等待恢復工作者及找到職業而未開始工作亦無報酬者。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>非勞動力</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/非勞動力.svg"
                  alt=""
                  style="width: 65px; height: 55px;"
                />
              </td>
              <td>
                <span>
                  指在資料標準週內，年滿 15
                  歲不屬於勞動力之民間人口，包括因就學、料理家務、高齡、身心障礙及其他原因等而未工作亦未找工作者。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>勞動力參與率</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/勞動力參與率.svg"
                  alt=""
                  style="width: 70px; height: 50px;"
                />
              </td>
              <td>
                <span>
                  勞動力占 15 歲以上民間人口之比率。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>失業率</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/失業率.svg"
                  alt=""
                  style="width: 65px; height: 50px;"
                />
              </td>
              <td>
                <span>
                  失業者占勞動力之比率。
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="detailtable2">
          <caption style="display: none;"></caption>
          <thead style="display: none;">
            <tr>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>15歲以上<br />民間人口</span>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/15歲以上民間人口.svg"
                  alt=""
                  style="width: 65px;"
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  15 歲以上本國人口扣除武裝勞動力（現役軍人）、監管人口與
                  失蹤人口，包括勞動力與非勞動力。
                </span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>勞動力</span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/民間勞動力.svg"
                  alt=""
                  style="width: 55px;"
                />
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>
                  指在資料標準週內年滿 15
                  歲可以工作之民間人口，包括就業者及失業者。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>就業者</span>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/就業者.svg"
                  alt=""
                  style="width: 20px; height: 55px;"
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  指在資料標準週內年滿 15 歲從事有酬工作者，或從事
                  15小時以上之無酬家屬工作者。
                </span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>失業者</span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/失業者.svg"
                  alt=""
                  style="width: 55px; height: 50px;"
                />
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>
                  指在資料標準週內年滿 15 歲同時具有下列條件者：
                  1.無工作；2.隨時可以工作；3.正在尋找工作或已找工作在等待結果。此外，尚包括等待恢復工作者及找到職業而未開始工作亦無報酬者。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>非勞動力</span>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/非勞動力.svg"
                  alt=""
                  style="width: 65px; height: 55px;"
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  指在資料標準週內，年滿 15
                  歲不屬於勞動力之民間人口，包括因就學、料理家務、高齡、身心障礙、想工作而未找工作且隨時可以開始工作及其他原因等而未工作亦未找工作者。
                </span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>勞動力參與率</span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/勞動力參與率.svg"
                  alt=""
                  style="width: 70px; height: 50px;"
                />
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>
                  勞動力占 15 歲以上民間人口之比率。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>失業率</span>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/失業率.svg"
                  alt=""
                  style="width: 65px; height: 50px;"
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  失業者占勞動力之比率。
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal-header AllCenter">
      <label>就業者之從業身分</label>
    </div>
    <div class="modal-body">
      <div class="modalimgs AllCenter">
        <img src="@/assets/images/Common_Inquire/就業者之從業身分.svg" alt="" />
      </div>
      <div class="modaltable">
        <table class="detailtable">
          <caption style="display: none;"></caption>
          <thead style="display: none;">
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>雇主</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/雇主.svg"
                  alt=""
                />
              </td>
              <td>
                <span>
                  指自己經營或合夥經營事業而僱有他人幫助工作之就業者。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>自營作業者</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/自營作業者.svg"
                  alt=""
                />
              </td>
              <td>
                <span>
                  指自己經營或合夥經營事業而未僱有他人之就業者。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>受僱者</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/受雇者.svg"
                  alt=""
                />
              </td>
              <td>
                <span>
                  指為薪資或其他經濟報酬而受僱者，並分為受私人僱用者及受政府僱用者二類。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>無酬家屬工作者</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/無酬家屬工作者.svg"
                  alt=""
                />
              </td>
              <td>
                <span>
                  指幫同戶長或其他家屬從事營利工作而不支領薪資之就業者。
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="detailtable2">
          <caption style="display: none;"></caption>
          <thead style="display: none;">
            <tr>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>雇主</span>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/雇主.svg"
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  指自己經營或合夥經營事業而僱有他人幫助工作之就業者。
                </span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>自營作業者</span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/自營作業者.svg"
                  alt=""
                />
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>
                  指自己經營或合夥經營事業而未僱有他人之就業者。
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>受僱者</span>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/受雇者.svg"
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  指為薪資或其他經濟報酬而受僱者，並分為受私人僱用者及受政府僱用者二類。
                </span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>無酬家屬工作者</span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/無酬家屬工作者.svg"
                  alt=""
                />
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>
                  指幫同戶長或其他家屬從事營利工作而不支領薪資之就業者。
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal-footer AllLeft">
      <span
        >若想了解更多，請瀏覽
        <a
          :href="RequetURL.defpdfurl"
          tabindex="0"
          title="編製方法與名詞定義.pdf"
          >編製方法與名詞定義.pdf</a
        ></span
      >
    </div>
  </v-container>
</template>
