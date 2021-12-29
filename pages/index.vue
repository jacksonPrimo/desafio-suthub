<template>
  <v-card class="mx-md-5 mx-2 my-5 px-md-4 px-2 py-2">
    <v-form
      ref="form"
      lazy-validation
    > 
      <v-row>
        <v-col md="6" cols="12">
          <v-text-field
            v-model="formData.name"
            :rules="nameRules"
            prepend-icon="mdi-account-details"
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field
            v-model="formData.cpf"
             v-mask="'###.###.###-##'"
            :rules="cpfRules"
            prepend-icon="mdi-badge-account-horizontal"
            label="Cpf"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="formData.petSpecie"
            label="Espécie"
            prepend-icon="mdi-dog-side"
            :items="['cão', 'gato', 'outro']"
            :rules="petSpecieRules"
            @change="formData.petBreed = ''"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-if="formData.petSpecie === 'outro'"
            v-model="formData.petBreed"
            label="Raça"
            :prepend-icon="breed.icon"
            :rules="petBreedRules"
          ></v-text-field>
          <v-select
            v-else
            v-model="formData.petBreed"
            label="Raça"
            :prepend-icon="breed.icon"
            :items="breed.breeds"
            :rules="petBreedRules"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <v-text-field
            v-model="formData.birthDate"
            label="Data de Nascimento"
            :rules="birthDateRules"
            prepend-icon="mdi-cake-variant"
            type="datetime-local"
          ></v-text-field>
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field
            v-model="formData.monthlyIncome"
            type="number"
            min="0"
            label="Renda Mensal"
            prepend-icon="mdi-currency-usd"
            :rules="monthlyIncomeRules"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="3" cols="12">
          <v-text-field
            v-model="formData.address.cep"
            v-mask="'#####-###'"
            label="Cep"
            prepend-icon="mdi-mailbox"
            :rules="cepRules"
            @change="autoCompleteAddress()"
          ></v-text-field>
        </v-col>
        <v-col sm="5" cols="12">
          <v-text-field
            v-model="formData.address.city"
            label="Cidade"
            prepend-icon="mdi-home-city-outline"
            :rules="cityRules"
          ></v-text-field>
        </v-col>
        <v-col sm="4" cols="12">
          <v-select
            v-model="formData.address.state"
            label="Estado"
            prepend-icon="mdi-earth-box"
            :items="states"
            :rules="stateRules"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="6" cols="12">
          <v-text-field
            v-model="formData.address.district"
            prepend-icon="mdi-city-variant-outline"
            label="Bairro"
            :rules="districtRules"
          ></v-text-field>
        </v-col>
        <v-col sm="6" cols="12">
          <v-text-field
            v-model="formData.address.street"
            prepend-icon="mdi-road"
            label="Rua"
            :rules="streetRules"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex justify-center my-3">
        <v-btn
          color="teal draken-4"
          outlined
          class="mr-4 details-button"
          @click="register"
        >          
          <span>Registrar</span>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <v-btn
          color="red"
          class="details-button"
          outlined
          @click="resetForm"
        >
          <span>Resetar</span>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
<script>
import { required, minLength, minValue } from 'vuelidate/lib/validators'
import { cpf } from 'cpf-cnpj-validator';
import Swal from 'sweetalert2'
export default {
  name: "IndexPage",
  validations: {
    formData: {
      name: {
        required,
        lastName: v => {
          const splited = v ? v.split(' '): []
          return (splited.length > 1 && splited[1].length > 0)
        }
      },
      cpf: {
        required,
        minLength: minLength(14),
        valid: v => cpf.isValid(v)
      },
      petSpecie: {
        required,
      },
      petBreed: {
        required,
      },
      birthDate: {
        required,
        ageRange: v => {
          const today = new Date();
          const birthDate = new Date(v);
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return (age >= 18 && age <= 65)
        }
      },
      monthlyIncome: {
        required,
        minValue: minValue(1000)
      },
      address: {
        cep: {
          required,
          minLength: minLength(9)
        },
        state: {
          required
        },
        city: {
          required
        },
        district: {
          required
        },
        street: {
          required
        },
      }
    }
  },
  data: () => ({
    formData: {
      name: '',
      cpf: '',
      petSpecie: '',
      petBreed: '',
      birthDate: '',
      monthlyIncome: 0,
      address: {
        cep: '',
        state: '',
        city: '',
        district: '',
        street: '',
      }
    },
    states: ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"]
  }),
  computed: {
    nameRules() {
      return [
        () => this.$v.formData.name.required || 'O seu nome é um campo obrigatório',
        () => this.$v.formData.name.lastName || 'Preencha com nome e sobrenome'
      ]
    },
    cpfRules(){
      return [
        () => this.$v.formData.cpf.required || 'O seu Cpf é um campo obrigatório',
        () => this.$v.formData.cpf.minLength || 'Preencha com os 11 caracteres',
        () => this.$v.formData.cpf.valid || 'Preencha com um cpf válido'
      ]
    },
    petSpecieRules() {
      return [
        () => this.$v.formData.petSpecie.required || 'A espécie do seu pet é um campo obrigatório',
      ]
    },
    petBreedRules() {
      return [
        () => this.$v.formData.petBreed.required || 'A espécie do seu pet é um campo obrigatório',
      ]
    },
    birthDateRules() {
      return [
        () => this.$v.formData.birthDate.required || 'A sua data de nascimento é um campo obrigatório',
        () => this.$v.formData.birthDate.ageRange || 'A idade permitida é entre 18 e 65 anos',
      ]
    },
    monthlyIncomeRules() {
      return [
        () => this.$v.formData.monthlyIncome.required || 'Sua renda mensal é um campo obrigatório',
        () => this.$v.formData.monthlyIncome.minValue || 'Valor mínimo de R$ 1000,00',
      ]
    },
    cepRules() {
      return [
        () => this.$v.formData.address.cep.required || 'O cep é um campo obrigatório',
        () => this.$v.formData.address.cep.minLength || 'Preencha com os 8 caracteres',
      ]
    },
    stateRules() {
      return [
        () => this.$v.formData.address.state.required || 'O estado é um campo obrigatório',
      ]
    },
    cityRules() {
      return [
        () => this.$v.formData.address.city.required || 'A cidade é um campo obrigatório',
      ]
    },
    districtRules() {
      return [
        () => this.$v.formData.address.district.required || 'O bairro é um campo obrigatório',
      ]
    },
    streetRules() {
      return [
        () => this.$v.formData.address.street.required || 'O rua é um campo obrigatório',
      ]
    },
    breed(){
      switch(this.formData.petSpecie){
        case 'cão':
          return {
            icon: 'mdi-dog',
            breeds: ['Pastor Alemão', 'Pug', 'Poodle', 'Vira Lata', 'buldogue']
          };
        case 'gato':
          return {
            icon: 'mdi-cat',
            breeds: ['Persa', 'Siamês', 'Ragdoll', 'Angorá', 'Thai']
          }
        default:
          return {
            icon: 'mdi-duck',
            breeds: []
          }
      }
    }
  },
  methods: {
    async autoCompleteAddress(){
      if(!this.$v.formData.address.cep.$invalid){
        const proceed = await Swal.fire({
          title: 'Deseja auto preencher os outros campos?',
          showCancelButton: true,
          confirmButtonText: `Sim`,
          cancelButtonText: `Não`
        })
        if(proceed.isConfirmed) {
          try {
            const { data } = await this.$axios.get(`${process.env.API_CEP}${this.formData.address.cep}/json`)
            if(data.erro){
              Swal.fire('Desculpe não encontramos endereço com este cep', '', 'error')
              return
            }
            this.formData.address.state = data.uf
            this.formData.address.city = data.localidade
            this.formData.address.district = data.bairro
            this.formData.address.street = data.logradouro
          } catch(error){
            Swal.fire('Desculpe ocorreu um erro inesperado em nossa busca', '', 'error')
          }
        }
      }
    },
    register(){
      if(this.$v.$invalid){
        Swal.fire('Preencha todos os dados corretamente', '', 'error')
        this.$refs.form.validate()
      } else {
        this.registerInBackend(this.formData)
          .then(()=>{
            this.resetForm()
            Swal.fire('Usuário cadastrado com sucesso', '', 'success')
          })
          .catch(()=>{
            Swal.fire('Erro ao cadastrar usuário', '', 'error')
          })
      }
    },
    // apenas uma simulação de requisição a uma api
    registerInBackend(data){
      console.log(data)
      return new Promise((resolve, reject)=>{
        setTimeout(()=>{
          Math.random() > 0.5 
            ? resolve({code: 200, message: 'success in register'}) 
            : reject(new Error('error on register'))
        }, 3000)
      })
    },
    resetForm(){
      this.$refs.form.reset()
    }
  },
}
</script>
<style lang="scss" scoped>
.details-button span {
  max-width: 0;
  display: inline-flex;
  white-space: nowrap;
  transition: max-width 0.5s, padding-right 0.45s;
  overflow: hidden;
}

.details-button:hover span, .details-button:focus span {
  max-width: 100px;
  padding-right: 10px !important;
}
// @media (min-width: 700px) {
// }
</style>