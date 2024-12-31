/*-----------------------------------
初回のみローディング
-----------------------------------*/
/*
  このスクリプトは、初回アクセス時にローディングアニメーションを表示し、3秒後に非表示にします。
  2回目以降のアクセス時には、ローディングアニメーションをスキップして、通常画面を表示します。
  sessionStorageを使用して、ユーザーが初回アクセスかどうかを判断します。
*/
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
// このコードは、ハンバーガーメニューの開閉とリンククリック後のページ遷移を管理します。
// 1. メニューボタンをクリックすると、メニューが開閉します。
// 2. メニュー内のリンクをクリックすると、トランジションなしでリンク先に遷移します。
// 3. メニューが開いているときはスクロールを無効化し、閉じるとスクロールを有効化します。
// 4. メニュー内のリンククリック時、トランジションを一時的に無効化し、リンク先に遷移します。

jQuery(function () {
  const $menuButton = jQuery("#js-btn-menu");
  const $menuContent = jQuery("#js-contentArea");
  const $body = jQuery("body");

  // ハンバーガーメニューの開閉を管理する関数
  // 引数openに基づいてメニューの表示/非表示を切り替え
  const toggleMenu = (open) => {
    // メニューボタンとメニューコンテンツの状態を切り替え
    $menuButton.toggleClass("is-checked", open);
    $menuContent.toggleClass("is-checked", open);
    $body.toggleClass("body-no-scroll", open); // メニューが開いているときにスクロールを無効化

    // メニューが開く場合はスクロールを無効化、閉じる場合はスクロールを有効化
    if (open) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  // メニューの開閉ボタンクリック時の処理
  // ボタンクリックでメニューの開閉をトグル（切り替え）
  $menuButton.on("click", function (e) {
    e.preventDefault(); // デフォルトの動作（リンク遷移など）を無効化
    toggleMenu(!$menuContent.hasClass("is-checked")); // メニューの開閉状態を切り替え
  });

  // メニュー内のリンクがクリックされたときの処理
  // トランジションなしでリンク先に遷移する
  $menuContent.find("a").on("click", function (e) {
    // メニューのトランジションを一時的に無効化
    $menuContent.css("transition", "none");

    // メニューを閉じる
    toggleMenu(false);

    // ページ遷移する前にトランジションなしでリンク先へ遷移
    setTimeout(
      function () {
        window.location = $(this).attr("href"); // クリックされたリンク先に遷移
      }.bind(this),
      0
    ); // クリックイベントが完了してから遷移するように設定
  });

  // スクロールを無効化する関数
  // マウスホイールやタッチスクリーンでのスクロールを禁止
  const disableScroll = () => {
    jQuery(window).on("scroll mousewheel touchmove", preventDefault); // イベントリスナーを追加
  };

  // スクロールを有効化する関数
  const enableScroll = () => {
    jQuery(window).off("scroll mousewheel touchmove", preventDefault); // イベントリスナーを削除
  };

  // スクロール動作を防ぐための補助関数
  const preventDefault = (e) => {
    e.preventDefault(); // デフォルトのスクロール動作を無効化
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
$(function () {
  MicroModal.init({
    openClass: "is-open",
    disableScroll: true, // 背景スクロールを制御
    onShow: (modal) => {
      $("body").addClass("modal-open"); // 背景スクロールを制御
      $(modal).find(".modal__container").scrollTop(0); // モーダル内をトップにスクロール
    },
    onClose: () => {
      $("body").removeClass("modal-open"); // 背景スクロールの制御を解除
    },
  });
});

// /*
//   MicroModalとjQueryを組み合わせて以下を実現するコード：
//   1. モーダルを開いた際に背景を固定するため、bodyに`modal-open`クラスを追加。
//   2. モーダルを閉じた際に`modal-open`クラスを削除し、背景のスクロールを再有効化。
//   3. モーダルを開いたとき、コンテンツのトップが表示されるように設定。
// */

// $(function () {
//   MicroModal.init({
//     openClass: "is-open",
//     disableScroll: true, // MicroModalによる背景スクロール制御
//     onShow: (modal) => {
//       $("body").addClass("modal-open");
//       $(modal).find(".modal__container").scrollTop(0);
//     },
//     onClose: () => $("body").removeClass("modal-open"),
//   });

//   $(".open-modal-btn").on("click", () => MicroModal.show("myModal"));
//   $(".close-modal-btn").on("click", () => MicroModal.close("myModal"));
// });

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
