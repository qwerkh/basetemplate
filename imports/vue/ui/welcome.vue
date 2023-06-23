<template>
    <div>

        <v-row>
            <v-col cols="12" md="12" sm="12" class="d-flex flex-row justify-end">
                <span style="color: white">Welcome For Use</span>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="d-flex flex-row justify-center">
                <img src="/images/logo.png" style="height: 130px; width: auto;"
                     class="mb-4 mt-2"
                     alt="logo"/>
                <br>
            </v-col>

            <v-col cols="12" md="12" sm="12" class="d-flex flex-row justify-center">
                <h1 style="font-family: 'Khmer OS Muol light','Khmer OS Muol';" v-if="!$vuetify.breakpoint.mobile">

                    {{companyDoc.name}}</h1>
                <h2 style="font-family: 'Khmer OS Muol light','Khmer OS Muol';" v-if="!!$vuetify.breakpoint.mobile">

                    {{companyDoc.name}}</h2>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="d-flex flex-row justify-center">
                <h2 style="font-family: 'Khmer OS Muol light','Khmer OS Muol';" v-if="!$vuetify.breakpoint.mobile">
                    {{companyDoc.latinName}}</h2>
                <h3 style="font-family: 'Khmer OS Muol light','Khmer OS Muol';"  v-if="!!$vuetify.breakpoint.mobile">
                    {{companyDoc.latinName}}</h3>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="d-flex flex-row justify-center">
                <h2 style="font-family: 'Khmer OS Muol light','Khmer OS Muol';">
                    សូមស្វាគមន៍</h2>
                <hr>
            </v-col>

        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Home",
        mounted() {
            this.$jQuery('body').off();
        },
        data() {
            return {
                dense: this.$store.state.isDense,

            }
        },
        methods: {},
        computed: {
            module() {
                return this.$store.state.currentModule;
            },
            companyDoc() {
                return this.$store.state.companyDoc;
            }
        }
    }
</script>


<style scoped>

</style>