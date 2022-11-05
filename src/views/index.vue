<script setup>
  //
</script>

<template>
  <div class="main-menu">
    <div class="row">
      <div class="col-md-4">
        <RouterLink to="/employee-information/employee-data">
          <div class="card">
            <div class="card-body">
              <div class="card-number"></div>
              <!-- <i class="fa-solid fa-address-card fa-5x py-2"></i> -->
              <BIcon icon="card-list" size="4rem" />
            </div>
            <div class="card-footer">{{ $t("Employees_base") }}</div>
          </div>
        </RouterLink>
      </div>
      <div class="col-md-4">
        <RouterLink to="/employee-information/employee-list">
          <div class="card">
            <div class="card-body">
              <div class="card-number"></div>
              <i class="fa-solid fa-users-between-lines fa-5x py-2"></i>
              <BIcon icon="person-lines-fill" size="4rem" />
            </div>
            <div class="card-footer">{{ $t("Employees_list") }}</div>
          </div></RouterLink
        >
      </div>
      <div class="col-md-4">
        <RouterLink to="/employee-information/teacher-list">
          <div class="card">
            <div class="card-body">
              <div class="card-number"></div>
              <!-- <i class="fa-solid fa-chalkboard-user fa-5x py-2"></i> -->
              <BIcon icon="person-video3" size="4rem" />
            </div>
            <div class="card-footer">{{ $t("Teachers_list") }}</div>
          </div></RouterLink
        >
      </div>
      <div class="col-md-4">
        <RouterLink to="/student-information/studentList">
          <div class="card">
            <div class="card-body">
              <div class="card-number"></div>
              <i class="fa-solid fa-graduation-cap fa-5x py-2"></i>
            </div>
            <div class="card-footer">Talabalar kontengenti</div>
          </div></RouterLink
        >
      </div>
      <div class="col-md-4">
        <RouterLink to="/archive/diplomaList">
          <div class="card">
            <div class="card-body">
              <div class="card-number"></div>
              <i class="fa-solid fa-rectangle-list fa-5x py-2"></i>
            </div>
            <div class="card-footer">Diplomlar ro'yxati</div>
          </div></RouterLink
        >
      </div>
      <div class="col-md-4">
        <RouterLink to="/messages/index">
          <div class="card">
            <div class="card-body">
              <div class="card-number"></div>
              <i class="fa-solid fa-comments fa-5x py-2"></i>
            </div>
            <div class="card-footer">Mening xabarlarim</div>
          </div></RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .main-menu {
    .card {
      opacity: 0.8;
      transition: 0.3s ease;
      &:hover {
        opacity: 1;
        .card-footer {
          .footer-text {
            animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            transform: translate3d(0, 0, 0);
          }
        }
      }
      .card-body {
        // border: 3px solid #00264b;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          color: #e87525;
        }
        .card-number {
          width: 70px;
          height: 70px;
          position: absolute;
          top: 15px;
          right: 15px;
          // border: 5px solid #a2d2ff;
          border-radius: 50%;
          background-color: #f5f5f5;
        }
      }
      .card-footer {
        text-align: center;
        background-color: #00264b;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        padding: 10px 15px;
      }
    }
  }
</style>
