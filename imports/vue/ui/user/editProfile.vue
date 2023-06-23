<template>
    <v-row justify="center">
        <v-flex
                md4
        >
            <v-form
                    :model="valid" ref="formData"
                    lazy-validation
            >
                <v-card-title>
                    <v-layout column align-center justify-center class="mb-2">
                        <img :src="user.url || '/images/avatar.png'" style="height: 130px; width: auto;"
                             class="mb-4 mt-2"
                             alt="logo" @click="$refs.fileInput.click()"/>
                        <input style="display: none !important;" type="file" @change="onFileSelected"
                               ref="fileInput"></input>
                        <div class="headline font-weight-bold center primary--text"
                             style="line-height: 46px!important;">
                            {{user.username || ""}}
                        </div>
                    </v-layout>
                </v-card-title>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                v-model="user.username"
                                :label="$t('userName')"
                                persistent-hint
                                required
                                disabled
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                                v-model="user.profile.fullName"
                                :rules="profileNameRules"
                                :label="$t('profileName')"
                                persistent-hint
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field :label="$t('email')" required
                                      v-model="user.email"
                                      :rules="emailRules"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-card-actions>

                    <v-spacer></v-spacer>
                    <reset-button @resetForm="resetForm" valid="false"></reset-button>
                    <save-button @saveForm="handleSubmit" v-shortkey="['enter']"
                                 @shortkey.native="handleSubmit" :valid="valid"></save-button>

                </v-card-actions>
            </v-form>
        </v-flex>
        >

    </v-row>

</template>

<script>
    import AddButton from "../../components/addButton"
    import RaiseButton from "../../components/raiseAddButton"
    import SaveButton from "../../components/saveButton"
    import CloseButton from "../../components/closeButton"
    import ResetButton from "../../components/resetButton"
    import {mapActions} from "vuex"
    import axios from "axios";
    import firebase from 'firebase';
    import "/imports/firebase/config";

    export default {
        mounted() {
            this.$jQuery('body').off();
        },
        components: {AddButton, RaiseButton, SaveButton, ResetButton, CloseButton},
        data() {
            return {
                valid: true,
                selectedFile: null,
                uploadValue: 0,
                dense: this.$store.state.isDense,

                user: {
                    _id: "",
                    username: "",
                    profile: {
                        fullName: "",
                    },
                    email: '',
                    url: ""
                },
                profileNameRules: [
                    v => !!v || 'Profile Name is required',
                    v => (v && v.length <= 20) || 'Name must be less than 20 characters',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ]
            }
        },

        methods: {
            ...mapActions(["updateUser"]),
            resetForm() {
                this.$refs.formData.reset()
            },
            onFileSelected(e) {
                let vm = this;
                this.selectedFile = e.target.files[0];
                Meteor.setTimeout(function () {
                    vm.onUpload();
                }, 500);
            },
            onUpload() {
                let vm = this;
                const storageRef = firebase.storage().ref("user" + moment().format("YYYYMMDDHHmmss") + this.selectedFile.name).put(this.selectedFile);
                storageRef.on(`state_changed`, snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    }, error => {
                        console.log(error.message)
                    },
                    () => {
                        this.uploadValue = 100;
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            vm.user.url = url || "";
                            Meteor.call("base_updateProfileImg", vm.user._id, url, (err, result) => {
                                if (err) {

                                    console.log(err.message);
                                }
                            })
                        });
                    }
                );
            },
            handleSubmit() {
                let vm = this;

                if (vm.$refs.formData.validate()) {
                    vm.loading = true;
                    Meteor.call("base_updateProfile", vm.user._id, vm.user, (err, result) => {
                        if (!err) {
                            this.$message({
                                message: this.$t('successNotification'),
                                showClose: true,
                                type: 'success'
                            });
                            vm.updateUser(Meteor.user());
                            vm.loading = false;
                        } else {
                            console.log(err.message);
                            this.$message({
                                message: err.message,
                                showClose: true,
                                type: 'error'
                            });

                        }
                    })
                }
            },

        },
        created() {
            let userDoc = Meteor.user();
            if (userDoc) {
                this.user._id = userDoc && userDoc._id || "";
                this.user.username = userDoc.username;
                this.user.profile.fullName = userDoc.profile.fullName;
                this.user.email = userDoc.emails && userDoc.emails[0] && userDoc.emails[0].address;
                this.user.url = userDoc.url || "";
            }
        }
    }
</script>