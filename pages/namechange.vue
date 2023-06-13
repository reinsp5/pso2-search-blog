<script lang="ts" setup>
import { getAuth } from "firebase/auth";
import { VForm } from "vuetify/lib/components/index.mjs";

definePageMeta({
  middleware: ["auth"],
});

const displayName = ref("");

// フォームバリデーションチェック
const form = ref<VForm | null>(null);

// ユーザー名の入力は必須
const validateDisplayName = (value: string) =>
  !!value || "ユーザー名は必須です";

// アラートの表示
const alert = ref(false);

// ダイアログの表示
const dialog = ref(true);

// ローディングの表示
const loading = ref(false);

const user = getAuth().currentUser;
if (user) {
  displayName.value = user.displayName ?? "";
}

// ユーザ情報の更新
const updateUser = async () => {
  loading.value = true;
  const formValidate = await form.value!.validate();
  if (!formValidate.valid) {
    return;
  }
  const { setUserNameFirst } = useAuth();
  alert.value = await setUserNameFirst(displayName.value);
  loading.value = false;
  // 1秒後にアラートを閉じてリダイレクト
  setTimeout(() => {
    alert.value = false;
    navigateTo("/account");
  }, 1000);
};
</script>

<template>
  <v-container>
    <v-dialog v-model="dialog" persistent width="auto">
      <v-card variant="flat" color="primary" min-height="300">
        <v-card-title class="mt-2 text-body-1 text-md-h5">
          【重要】ユーザ名を確認してください
        </v-card-title>
        <v-card-text class="text-caption text-md-body-1">
          PSO2 Searchにご登録ありがとうございます。<br />
          アイテム情報を登録／編集し皆で共有しましょう！<br />
          PSO2が一層盛り上がるように願いを込めて…<br />
          <div class="mt-4">
            でもその前に…<br />
            <span class="font-weight-bold text-decoration-underline"
              >ご自身のユーザー名を確認してください！</span
            >
          </div>
          <div class="mt-4">
            OAuth認証による登録では、<span class="text-decoration-underline"
              >その時点でそのサービスに登録されているユーザ名</span
            >でアカウントが作成されます。<br />
            万が一<span class="font-weight-bold">本名</span
            >になっている場合は、この場で変更してください。<br />
          </div>

          <div class="mt-4">
            ユーザー名は、アイテムを登録または編集した際に登録者／編集者として記録されますのでご注意ください。<br />
            また、ユーザー名をあとから変更してもすでに登録／編集によって記録されたユーザー名は変更されませんのでくれぐれもご注意ください。
          </div>

          <div class="mt-4">
            ユーザー名を変更しないことにより生じた一切の損害について、当サイトは一切の責任を負いません。<br />
            （<NuxtLink class="text-white" to="/terms" target="_blank"
              >利用規約</NuxtLink
            >
            第５条に基づく）
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="font-weight-bold"
            color="white"
            variant="text"
            @click="dialog = false"
          >
            了解しました
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" variant="outlined" max-width="960">
          <v-card-title class="ma-4 text-h6 text-md-h5">
            ユーザー名の変更
          </v-card-title>
          <v-row>
            <v-col class="ml-8" md="12">
              <div class="text-caption text-body-1">
                ※ユーザー名が本名など個人情報を含む場合は、
                <span class="font-weight-bold"> 必ず変更してください。 </span>
                <br />
                ※ユーザー名を変更しても、すでに登録／編集によって記録されたユーザー名は変更されません。
              </div>
            </v-col>
            <v-col>
              <v-form ref="form" validate-on="input" class="mx-8" @submit.prevent="updateUser">
                <v-text-field
                  v-model="displayName"
                  :rules="[validateDisplayName]"
                  variant="outlined"
                  label="ユーザー名"
                />
                <v-btn
                  block
                  :loading="loading"
                  color="primary"
                  class="text-none mb-4"
                  size="x-large"
                  variant="flat"
                  type="submit"
                >
                  ユーザー名を変更する
                </v-btn>
              </v-form>
              <v-fade-transition>
                <v-alert
                  class="mx-8 mb-8"
                  v-model="alert"
                  position="static"
                  type="success"
                  title="ユーザー名を変更しました。"
                  closable
                />
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
