<template>
  <v-container>
    <div class="modal-header AllCenter">
      <label>表格說明</label>
    </div>
    <div class="modal-body AllCenter">
      <div style="width: 50%; height: 435px; padding: 10px;">
        <div style="width: 100%;">
          <span>
            在查詢結果的統計表中，至多可能出現三種顏色之表格，以下為顏色之說明：
          </span>
        </div>
        <div style="width: 100%;">
          <img src="@/assets/images/y_circle.svg" alt="" />
          <span>
            : 該統計項總計
          </span>
        </div>
        <div style="width: 100%;">
          <img src="@/assets/images/db_circle.svg" alt="" />
          <span>
            : 部分統計項群組合計
          </span>
        </div>
        <div style="width: 100%;">
          <img src="@/assets/images/ab_circle.svg" alt="" />
          <span>
            : 部分統計項群組合計
          </span>
        </div>
        <div style="width: 100%;">
          <span>
            其關係如右圖所示
          </span>
        </div>
        <div style="width: 100%; margin-top: 50px;">
          <span>
            舉例說明
          </span>
        </div>
        <div style="width: 100%;">
          <span>
            總計 = (15-24歲)+ (25-34歲) = (15 -19歲) + (20-24歲) + (25-29歲) +
            (30-34歲)
          </span>
        </div>
      </div>
      <div style="width: 50%;">
        <img
          src="@/assets/images/tableexplan.svg"
          style="width: 100%;"
          alt=""
        />
      </div>
    </div>
  </v-container>
</template>
