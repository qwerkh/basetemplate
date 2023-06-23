<template>
    <v-fab-transition>
        <v-hover
                v-slot:default="{ hover }"
                close-delay="200"
        >
            <v-btn rounded color="green" dark @click="$emit('withdraw')" class="fontTitle" :elevation="hover ? 16 :2"
                   :loading="loading"
            >{{$t("withdrawMoney")}} [ + ]
                <v-icon dark right>mdi-cash</v-icon>
            </v-btn>
        </v-hover>
    </v-fab-transition>
</template>
<script>
    export default {
        name: "WithdrawButton",
        props: ["loading"]
    }
</script>
