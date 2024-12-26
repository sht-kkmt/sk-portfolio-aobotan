/*-----------------------------------
初回のみローディング
-----------------------------------*/
$(function () {
  var webStorage = function () {
    if (sessionStorage.getItem("access")) {
      /*
        2回目以降アクセス時の処理
      */
      $(".loading").addClass("is-active");
    } else {
      /*
        初回アクセス時の処理
      */
      sessionStorage.setItem("access", "true"); // sessionStorageにデータを保存
      $(".loading-animation").addClass("is-active"); // loadingアニメーションを表示
      setTimeout(function () {
        // ローディングを数秒後に非表示にする
        $(".loading").addClass("is-active");
        $(".loading-animation").removeClass("is-active");
      }, 3000); // ローディングを表示する時間
    }
  };
  webStorage();
});

/*-----------------------------------
SPハンバーガーメニュー
-----------------------------------*/
/*
  このスクリプトの機能：
  1. ハンバーガーメニューの展開/非展開をトグルします。
     - メニューが展開されると、ボタンとメニュー領域に `is-checked` クラスを付与します。
     - クラスの有無で展開状態を制御します。
  2. メニュー展開時に背景スクロールを無効化します。
     - `body` に `body-no-scroll` クラスを追加して基本的なスクロールを停止します。
     - マウスホイールやタッチ操作によるスクロールも防ぎます。
  3. メニューを閉じた際にスクロールを再有効化します。
  4. ハンバーガーメニュー内のリンクをクリックした際にメニューを閉じます。
*/

jQuery(function () {
  const $menuButton = jQuery("#js-btn-menu");
  const $menuContent = jQuery("#js-contentArea");
  const $body = jQuery("body");

  // ハンバーガーメニューのトグル処理
  const toggleMenu = (open) => {
    $menuButton.toggleClass("is-checked", open);
    $menuContent.toggleClass("is-checked", open);
    $body.toggleClass("body-no-scroll", open);

    if (open) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  // メニューの開閉ボタンクリック時の処理
  $menuButton.on("click", function (e) {
    e.preventDefault();
    toggleMenu(!$menuContent.hasClass("is-checked"));
  });

  // メニュー内のリンクがクリックされたときの処理
  $menuContent.find("a").on("click", function () {
    toggleMenu(false); // メニューを閉じる
  });

  // マウスホイールとタッチスクロールを無効化する関数
  const disableScroll = () => {
    jQuery(window).on("scroll mousewheel touchmove", preventDefault);
  };

  // マウスホイールとタッチスクロールを有効化する関数
  const enableScroll = () => {
    jQuery(window).off("scroll mousewheel touchmove", preventDefault);
  };

  // デフォルトのスクロール動作を防ぐ
  const preventDefault = (e) => {
    e.preventDefault();
  };
});

/*-----------------------------------
トップページfvテキストのフェード
-----------------------------------*/
$(window).on("load", function () {
  $("#js-box").addClass("load");
});

/*-----------------------------------
サイドバーのアコーディオン
-----------------------------------*/
$(document).ready(function () {
  $(".sidebar__drawer").hover(
    function () {
      //
      $(this).addClass("is-open");
      $(this).find(".sidebar__items").stop(true, true).slideDown(300);
    },
    function () {
      //
      $(this).removeClass("is-open");
      $(this).find(".sidebar__items").stop(true, true).slideUp(300);
    }
  );
});

/*-----------------------------------
swiper
-----------------------------------*/
// const swiper = new Swiper(".swiper", {
//   loop: true,
//   autoplay: {
//     delay: 3000,
//   },
// });

const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 4200,
  // centeredSlides: false,
  slidesPerView: "auto",
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
    // spaceBetween: 48,
  },
});

/*-----------------------------------
MicroModal
-----------------------------------*/

/*
  MicroModalとjQueryを組み合わせて以下を実現するコード：
  1. モーダルを開いた際に背景を固定するため、bodyに`modal-open`クラスを追加。
  2. モーダルを閉じた際に`modal-open`クラスを削除し、背景のスクロールを再有効化。
  3. モーダルを開いたとき、コンテンツのトップが表示されるように設定。
*/

$(function () {
  MicroModal.init({
    openClass: "is-open",
    disableScroll: true, // MicroModalによる背景スクロール制御
    onShow: (modal) => {
      $("body").addClass("modal-open");
      $(modal).find(".modal__container").scrollTop(0);
    },
    onClose: () => $("body").removeClass("modal-open"),
  });

  $(".open-modal-btn").on("click", () => MicroModal.show("myModal"));
  $(".close-modal-btn").on("click", () => MicroModal.close("myModal"));
});

/*-----------------------------------
送信完了ページに遷移
-----------------------------------*/
/*
  このスクリプトでは以下の処理をjQueryを使って実装しています：
  1. フォームの必須項目がすべて入力され、ラジオボタンが選択され、
     チェックボックスがチェックされている場合にのみ送信ボタンを有効化します。
  2. フォーム内のすべての入力欄およびチェック要素の状態を監視し、
     入力があるたびに検証を行います。
  3. 送信ボタンが無効な場合、フォーム送信を防止し、
     ユーザーに未入力項目の存在を通知します。
*/

$(function () {
  const validateForm = () => {
    const isValid =
      $("#family-name").val().trim() &&
      $("#your-mail").val().trim() &&
      $("#your-address").val().trim() &&
      $('input[name="kind"]:checked').length &&
      $("#checkbox").is(":checked");
    $("#submit-btn").prop("disabled", !isValid);
  };

  $("#myForm input, #myForm textarea").on("input change", validateForm);

  $("#myForm").on("submit", function (e) {
    if ($("#submit-btn").prop("disabled")) {
      e.preventDefault();
      alert("フォームに必要な項目をすべて入力してください。");
    }
  });
});

/*-----------------------------------

-----------------------------------*/
