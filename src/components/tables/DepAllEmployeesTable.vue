<template>
  <v-table class="" style="min-width: 1000px;">
    <thead>
      <tr
        id="table-tr"
        class="bg-grey-100"
      >
        <th
          class="text-left"
          @click="sortByName"
        >
          F.I.O <span v-if="sortName">▲</span> <span v-else> ▼</span>
        </th>
        <th class="text-left">Lavozim</th>
        <th class="text-left">Stavka</th>
        <th class="text-left">Telefon</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in allEmployees"
        :key="item.id"
        class=""
      >
        <td class="d-flex align-center">
          <img
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
            alt=" "
            width="50"
            height="50"
            class="rounded-circle me-3 pa-1"
          />
          <span>{{ item.xodim.familiya }} {{ item.xodim.ism }} {{ item.xodim.sharif }}</span>
        </td>
        <td>{{ item.lavozim }}</td>
        <td>{{ item.stavka }}</td>
        <td>{{ item.xodim.telefon }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: 'DepAllEmployeesTable',
  data: () => ({
    sortName: false,
  }),
  methods: {
    sortByName() {
      if (this.sortName === false) {
        this.allEmployees.sort((a, b) => a.xodim.familiya.localeCompare(b.xodim.familiya))
        this.sortName = true
      } else {
        this.allEmployees.sort((a, b) => b.xodim.familiya.localeCompare(a.xodim.familiya))
        this.sortName = false
      }
    },
  },
  props: {
    allEmployees: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
#table-tr th {
  transition: background-color 0.2s ease;
  
}
#table-tr th:hover {
  cursor: pointer;
  background-color: #e6e6e6;
  color: #000;
}
/* #table-tr th::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #000;
    margin-right: 5px;
    display: inline-block;
  } */





  /* @media screen and (max-width: 600px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    th {
      display: none;
    }

    tr {
      margin-bottom: 40px;
    }

    td {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
    }



    
  } */
</style>
