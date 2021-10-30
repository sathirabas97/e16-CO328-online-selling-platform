<template>
  <div>
    <main id="user-content">
      <div id="logged">
        <!-- Schedule a time field -->
        <aside class="user-info" style="text-align: center">
          <!-- Logged -->
          <h3>Schedule a time</h3>
          <br />
          <div class="information" v-if="user.name != undefined">
            <!-- Pet select -->
            <div class="user-data config-data">
              <h1>Select your pet</h1>
              <select v-model="schedule.pet">
                <option v-for="pets in userPets" :key="pets._id">
                  {{ pets.name }}
                </option>
              </select>
            </div>

            <!-- Service select -->
            <div class="user-data config-data">
              <h1>Select service</h1>
              <select v-model="schedule.service">
                <option v-for="service in services" :key="service._id">
                  {{ service.name }}
                </option>
              </select>
            </div>

            <!-- Select DAY -->
            <div class="user-data config-data">
              <h1>Day</h1>
              <input
                type="text"
                placeholder="Enter the day"
                v-model="schedule.date.day"
              />
            </div>

            <!-- Select MONTH -->
            <div class="user-data config-data">
              <h1>Month</h1>
              <input
                type="text"
                placeholder="Enter the month"
                v-model="schedule.date.month"
              />
            </div>
          </div>

          <!-- Not logged MESSAGE -->
          <div class="information" v-else>
            <div class="message error">
              <h3>You must be logged in to schedule a time</h3>
            </div>
          </div>

          <!-- Display ERROR messages -->
          <div class="error message" v-if="scheduleError">
            <ul>
              <li v-for="error in scheduleErrors" :key="error.id">
                {{ error }}
              </li>
            </ul>
          </div>

          <!-- Display SUCCESS messages -->
          <div class="success message" v-if="scheduleSuccess">
            <ul>
              <li>
                {{ scheduleSuccessMsg }}
              </li>
            </ul>
          </div>

          <!-- CONFIRM button-->
          <div
            class="user-data config config-data"
            v-if="user.name != undefined"
          >
            <a @click.stop.prevent="scheduleATime()">
              <img src="/static/img/icons/schedule_icon.png" alt="" />
              To schedule
            </a>
          </div>
        </aside>

        <!--  Service Display -->
        <main>
          <!-- ALL the services -->
          <aside id="pets" v-if="!disponibility">
            <h1>Services</h1>

            <!-- Link to see the schedule table -->
            <div class="config">
              <a @click.stop.prevent="enableDisponibility()">
                <img src="/static/img/icons/clock_icon.png" alt="" />
                Check availability
              </a>
            </div>

            <!-- Display services -->
            <div id="services">
              <div
                class="service"
                v-for="service in services"
                :key="service._id"
              >
                <img src="/static/img/logos/inimal_logo.jpeg" alt="" />
                <h3>{{ service.name }}</h3>
                <h4>{{ service.description }}</h4>
                <h5>Responsible: {{ service.partner }}</h5>
                <h3>Price: ${{ service.price }},00</h3>
              </div>
            </div>
          </aside>

          <!-- Disponibility -->
          <main id="pet-config" v-else>
            <h1>Availability</h1>

            <!-- Return Button -->
            <div class="config">
              <a @click.stop.prevent="enableDisponibility()">
                <img src="/static/img/icons/return_icon.png" alt="" />
                Back to services
              </a>
            </div>
            <br />

            <!-- Schedulings input -->
            <div class="pet-data save">
              <h4>Enter the date you want to check</h4>
              <br />
              <!-- INPUTS -->
              <div class="inputs">
                <!-- Select DAY -->
                <div class="user-data config-data">
                  <h1>Day</h1>
                  <input
                    type="text"
                    placeholder="Enter the day"
                    v-model="see.day"
                  />
                </div>

                <!-- Select MONTH -->
                <div class="user-data config-data">
                  <h1>Month</h1>
                  <input
                    type="text"
                    placeholder="Enter the month"
                    v-model="see.month"
                  />
                </div>

                <!-- Select YEAR -->
                <div class="user-data config-data">
                  <h1>Year</h1>
                  <input
                    type="text"
                    placeholder="Enter the year"
                    v-model="see.year"
                  />
                </div>
              </div>

              <!-- Display ERROR messages -->
              <div class="error message" v-if="seeTableError">
                <ul>
                  <li>
                    {{ seeTableErrors }}
                  </li>
                </ul>
              </div>

              <!-- Search BUTTON -->
              <div class="config">
                <a @click.stop.prevent="searchSchedulingTable()">
                  <img src="/static/img/icons/search_icon.png" alt="" />
                  Search
                </a>
              </div>
              <br />
            </div>

            <!-- Table of schedulings -->
            <div id="earn-table" v-if="showTable === true">
              <h2>
                Schedule in : {{ see.day }} / {{ see.month }} / {{ see.year }}
              </h2>
              <table>
                <!-- Header -->
                <tr>
                  <th>Client</th>
                  <th>Pet</th>
                  <th>Service</th>
                </tr>

                <!-- Items -->
                <tr v-for="schedulings in scheduleTable" :key="schedulings._id">
                  <td>{{ schedulings.customer.name }}</td>
                  <td>{{ schedulings.pet }}</td>
                  <td>{{ schedulings.service }}</td>
                </tr>
              </table>
            </div>
          </main>
        </main>
      </div>
    </main>
  </div>
</template>

<script>
"use strict";
// import Service from '../scripts/services/services-config';
import Pet from "../scripts/user/pet-config";
import Bus from "./bus";

export default {
  name: "Services",
  props: {
    user: { type: Object },
  },
  data: () => {
    return {
      // Display data
      services: [],
      userPets: [],

      // Scheduling flags
      scheduleErrors: [],
      scheduleError: false,
      scheduleSuccessMsg: "",
      scheduleSuccess: false,

      // Scheduling data
      schedule: {
        date: {},
      },

      // See the schedule data
      see: {},
      seeTableError: false,
      seeTableErrors: "",

      // Disponibility
      disponibility: false,
      showTable: false,
      scheduleTable: [],
    };
  },
  async mounted() {
    try {
      // const service = new Service();
      // const res = await service.getServices();
      // this.getUserPets();
      // this.services = res;
    } catch (err) {}
  },
  methods: {
    // Get all the pets of an user that is logged in the site
    async getUserPets() {
      const pets = new Pet();
      try {
        const response = await pets.getPets(this.user._id, this.user.token);
        if (response) {
          if (response.status === 0) {
            this.userPets = response.data;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Scheduling methods
    // GET
    async searchSchedulingTable() {
      if (this.validateDate(this.see)) {
        return;
      }

      try {
        const service = new Service();
        const res = await service.getSchedulings(this.see);

        this.showTable = true;
        this.seeTableSuccess = true;
        this.seeTableError = false;
        this.scheduleTable = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    // POST
    async scheduleATime() {
      try {
        const service = new Service();
        // Invalid input
        if (
          !this.schedule.service ||
          !this.schedule.pet ||
          !this.schedule.date ||
          !this.schedule.date.day ||
          !this.schedule.date.month
        ) {
          this.scheduleError = true;
          this.scheduleSuccess = false;
          this.scheduleErrors[0] = "Fill in the data correctly";
          return;
        }

        if (
          this.schedule.date.day < 0 ||
          this.schedule.date.day > 31 ||
          this.schedule.date.month < 0 ||
          this.schedule.date.month > 12
        ) {
          this.scheduleError = true;
          this.scheduleSuccess = false;
          this.scheduleErrors[0] = "Enter a valid date";
          return;
        }

        this.schedule.customer = this.user._id;

        for (let i = 0; i < this.services.length; i++) {
          if (this.services[i].name === this.schedule.service) {
            this.schedule.price = this.services[i].price;
          }
        }

        this.schedule.date.year = "2021";
        const res = await service.schedule(this.schedule, this.user.token);
        if (res.message) {
          if (res.message != "Full day") {
            this.scheduleError = false;
            this.scheduleSuccess = true;
            this.scheduleSuccessMsg = res.message;
          } else {
            this.scheduleError = true;
            this.scheduleSuccess = false;
            this.scheduleErrors[0] = res.message;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Change pages
    enableDisponibility() {
      this.disponibility = !this.disponibility;
    },
    validateDate(date) {
      // Empty fields
      if (!date || !date.day || !date.month || !date.year) {
        this.showTable = false;
        this.seeTableSuccess = false;
        this.seeTableError = true;
        this.seeTableErrors = "All fields must be filled in!";
        return true;
      } else if (date.day < 0 || date.day > 31) {
        this.showTable = false;
        this.seeTableSuccess = false;
        this.seeTableError = true;
        this.seeTableErrors = "Enter a valid day";
        return true;
      } else if (date.month < 0 || date.month > 12) {
        this.showTable = false;
        this.seeTableSuccess = false;
        this.seeTableError = true;
        this.seeTableErrors = "Enter a valid month";
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
/* media queries */
@media (max-width: 1050px) {
  #logged {
    display: grid;
    grid-template-columns: 4fr !important;
  }

  .config {
    text-align: center;
  }

  .information {
    display: grid;
    grid-template-columns: 1fr;
  }

  .user-info {
    border-right: none !important;
    border-bottom: 2px solid rgb(179, 179, 179);
    padding: 20px 40px !important;
    margin: 0px 20px;
  }

  .user-data {
    margin: 0px 10px !important;
  }

  #pet-config {
    padding: 20px 40px !important;
  }
}

@media (max-width: 710px) {
  .config a {
    font-size: 15px !important;
    margin: 10px !important;
  }
}

/* General config */
#user-content {
  background-color: white;
  margin: 30px 100px 20px 100px;
  border: 1px solid rgb(179, 179, 179);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
}
/* error msg */
#no-logged {
  color: red;
  text-align: center;
  height: 80vh;
}

span {
  font-size: 50px;
}

/* User display condig */
#logged {
  display: grid;
  grid-template-columns: 2fr 4fr;
  min-height: 500px;
}

.user-info {
  display: grid;
  border-right: 1px solid rgb(179, 179, 179);
  padding: 30px;
  min-width: 280px;
}

.user-data h3,
input[type="text"],
input[type="password"],
select {
  padding: 5px 0px 5px 20px;
  border: 1px solid blue;
  border-radius: 10px;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: 0.5s;
}

.user-data h2 {
  font-size: 15px;
}

.user-data input {
  min-width: 150px;
}
input,
select {
  overflow: hidden;
}

input[type="text"],
select {
  height: 30px;
  width: 100%;
  margin: 5px 0px 5px 0px;
}

input[type="text"]:focus,
input[type="password"]:focus,
select:focus {
  outline: none;
  box-shadow: 0px 0px 5px rgb(115, 115, 255);
}

/* User configuration display */
.config {
  margin-top: 20px;
  text-align: center;
}

.config img {
  height: 25px;
  width: 25px;
  margin-right: 5px;
  position: relative;
  top: 5px;
  transition: 3s;
}

.config a {
  font-size: 15px;
  text-decoration: none;
  color: rgb(107, 107, 206);
  transition: 0.5s;
  margin: 0px 30px;
}

.config a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.rotate:hover img {
  transform: rotate(360deg);
}

.config-data {
  font-size: 10px;
  margin: 0px 10px 0px 0px;
}

/* Pet information display */
#pet-config {
  padding: 20px 20px;
  border-bottom: 1px solid grey;
  min-height: 550px;
  text-align: center;
}

.pet-data {
  text-align: center;
}

.pet-data h1 {
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
}
input[type="file"] {
  margin-bottom: 10px;
  overflow: hidden;
  width: 120px;
}

/* Pet media queries */
@media (max-width: 1110px) {
  .pets-display {
    grid-template-columns: 1fr 1fr !important;
    overflow-x: hidden !important;
  }

  ::-webkit-scrollbar {
    display: inherit !important;
  }
}

@media (max-width: 1130px) {
  .pets-display {
    grid-template-columns: 1fr 1fr !important;
  }
}

@media (max-width: 900px) {
  .pets-display {
    grid-template-columns: 1fr 1fr !important;
  }
}

/* Pet grid display */
#pets {
  max-height: 550px;
  overflow: scroll;
  overflow-x: hidden;
}

#pets h1 {
  text-align: center;
  padding: 10px 0px;
  margin: 10px 0px;
}

.pets-display {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(177, 177, 177);
  border-radius: 5px;
}

.message {
  text-align: center;
  font-size: 20px;
  margin-bottom: 15px;
  transition: 1s;
}

.error ul,
.success ul {
  list-style-type: none;
}
.error li,
.succes li {
  font-size: 15px;
}

.error {
  color: rgb(255, 122, 122);
}
.success {
  color: rgb(80, 255, 138);
}

#services {
  padding: 5px;
  margin: 10px;
  font-size: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.service {
  margin: 10px;
  padding: 10px;
  border: 1px solid rgb(179, 179, 179);
  border-radius: 20px;
  color: rgb(162, 162, 253);
  min-width: 180px;
}

.service img {
  height: 100px;
  width: 100px;
  margin: 10px 0px;
}

.service h3 {
  font-size: 15px;
}

.service h4 {
  height: 100px;
}

.service h5 {
  height: 20px;
}

.inputs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
}

#earn-table {
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
}

#earn-table h2 {
  margin: 10px;
}

/* table */
#earn-table table {
  border: 1px solid rgb(165, 165, 165);
  border-radius: 10px;
  table-layout: auto;
}

#earn-table table tr th,
td {
  padding: 5px;
  width: 200px;
  overflow: hidden;
}
#earn-table table tr th:hover {
  background-color: white;
}
/* table  headers */
#earn-table table tr:hover {
  background-color: rgb(231, 231, 231);
}
</style>
