<template>
  <v-container>
    <div class="modal-header AllCenter">
      <label>Definition</label>
    </div>
    <div class="modal-body">
      <div class="modalimgs AllCenter">
        <img src="@/assets/images/Common_Inquire/勞動力分類_eng.svg" alt="" />
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
                <span>Civilian Population Age 15 & Above</span>
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
                  The population age 15 & above in Taiwan Area( Kinmen and
                  Lienchiang Counties are excluded), with the exception of armed
                  forces (current in-service soldiers), those incarcerated, and
                  the missing population. The civilian population includes both
                  the labor force and not in labor force.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Labor Force</span>
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
                  Civilians age 15 & above who are able to work, and includes
                  both employed and unemployed persons.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Employed</span>
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
                  Civilians age 15 & above who undertook a paid job, or worked
                  as an unpaid family worker for at least 15 hours during the
                  reference week.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Unemployed</span>
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
                  Civilians age 15 & above who were： <br />
                  (i) jobless <br />
                  (ii) available for work <br />
                  (iii) seeking a job or waiting for results after job seeking
                  during the reference week. Furthermore, those who wait for a
                  recall after layoff or have a job offer but have not started
                  to work are also classified into this category.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Not in Labor Force</span>
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
                  Civilian population age 15 and above who do not belong to the
                  labor force, and includes persons who are not working and not
                  seeking a job because they are currently receiving an
                  education or preparing to advance a higher education, managing
                  households, elders, disabled, and etc.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Labor Force Participation Rate</span>
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
                  (labor force / civilians age 15 & above) * 100%.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Unemployment Rate</span>
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
                  (unemployed / labor force) * 100%.
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
                <span>Civilian Population Age 15 & Above</span>
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
                  The population age 15 & above with the exception of armed
                  forces (current in-service soldiers), those incarcerated, and
                  the missing population. The civilian population includes both
                  the labor force and non-labor force.
                </span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>Labor Force</span>
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
                  Civilians age 15 & above who are able to work, and includes
                  both employed and unemployed persons.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Employed</span>
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
                  Civilians age 15 & above who undertook a paid job, or worked
                  as an unpaid family worker for at least 15 hours during the
                  reference week.
                </span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>Unemployed</span>
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
                  civilians age 15 & above who were： <br />
                  (i) jobless <br />
                  (ii) available for work <br />
                  (iii) seeking a job or waiting for results after job seeking
                  during the reference week. Furthermore, those who wait for a
                  recall after layoff or have a job offer but have not started
                  to work are also classified into this category.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Not in Labor Force</span>
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
                  Civilians age 15 & above who were not classified as labor
                  force during the reference week, including those who were not
                  working and not seeking a job because they were attending
                  schools, managing housework, elders, disabled, or persons who
                  want to work but not looking for a job.
                </span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>Labor Force Participation Rate</span>
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
                  (labor force / civilians age 15 & above) * 100%.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Unemployment Rate</span>
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
                  (unemployed / labor force) * 100%.
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal-header AllCenter">
      <label>Class of Worker</label>
    </div>
    <div cclass="modal-body">
      <div class="modalimgs AllCenter">
        <img
          src="@/assets/images/Common_Inquire/就業者之從業身分_eng.svg"
          alt=""
        />
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
                <span>Employer</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/雇主.svg"
                  alt=""
                />
              </td>
              <td>
                <span>
                  one hired employees to operate a business/firm owned by
                  himself/herself with or without other partners.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Own-account worker</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/自營作業者.svg"
                  alt=""
                />
              </td>
              <td>
                <span>
                  one ran a business/firm either by himself/herself or with
                  other partners but not hiring any employee.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Paid employee</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/受雇者.svg"
                  alt=""
                />
              </td>
              <td>
                <span>
                  one worked for pay in a private enterprise or a government
                  organ.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Unpaid family worker</span>
              </td>
              <td>
                <img
                  src="@/assets/images/Common_Inquire/Common_Detail/無酬家屬工作者.svg"
                  alt=""
                />
              </td>
              <td>
                <span>
                  one worked without pay to support one of his/her family
                  members (householder included) to undertake profit-oriented
                  work or business.
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
                <span>Employer</span>
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
                  one hired employees to operate a business/firm owned by
                  himself/herself with or without other partners.
                </span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>Own-account worker</span>
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
                  one ran a business/firm either by himself/herself or with
                  other partners but not hiring any employee.
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Paid employee</span>
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
                  one worked for pay in a private enterprise or a government
                  organ.
                </span>
              </td>
            </tr>
            <tr class="deftableblue">
              <td>
                <span>Unpaid family worker</span>
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
                  one worked without pay to support one of his/her family
                  members (householder included) to undertake profit-oriented
                  work or business.
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </v-container>
</template>
