import { validateEmail } from "./_helpers";

export function formManagement() {
  let forms = document.querySelectorAll("[data-order]"),
    requiredFields,
    emailFields,
    registerUserCheckBox,
    passwordField1,
    passwordField2,
    passwordFieldHideShows,
    registerUserArea;

  forms.forEach((form) => {
    registerUserCheckBox = document.querySelector("#registerUser");
    passwordField1 = document.getElementById("logonData.loginPassword");
    passwordField1 = document.getElementById("logonData.loginPassword");
    passwordField2 = document.getElementById("logonData.loginPasswordRepeat");
    passwordFieldHideShows = document.querySelectorAll(".passwordHideShow");
    registerUserArea = document.getElementById("registerUserArea");

    registerUserCheckBox.addEventListener("change", (e) => {
      if (e.target.checked) {
        registerUserArea.removeAttribute("hidden");
      } else {
        registerUserArea.setAttribute("hidden", true);
      }
    });

    /**
     * @param {HTMLElement} passwordFieldHideShow
     */
    passwordFieldHideShows.forEach((passwordFieldHideShow) => {
      /**
       * @param {Event} e
       */
      passwordFieldHideShow.addEventListener("click", (e) => {
        /** @const {HTMLElement} */
        const target = e.target;
        const liveRegion = target.nextElementSibling,
          passwordInput = target.previousElementSibling;

        if (passwordInput.getAttribute("type") === "password") {
          passwordInput.setAttribute("type", "text");
          liveRegion.textContent = "Password sichtbar";
        } else {
          passwordInput.setAttribute("type", "password");
          liveRegion.textContent = "Password unsichtbar";
        }
      });
    });

    /**
     * @param {Event} e
     */
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // requiredFields nicht cachen!
      requiredFields = document.querySelectorAll("[aria-required='true']");
      emailFields = document.querySelectorAll("input[type='email']");

      // Loope durch alle Pflichtfelder

      /**
       * @param {HTMLInputElement} requiredField
       */
      requiredFields.forEach((requiredField) => {
        const fieldInputEmptyThoughRequired =
          !requiredField.checked && requiredField.value === "";
        let idRefRequired = requiredField.getAttribute("data-required-error");

        if (fieldInputEmptyThoughRequired) {
          // Setze unausgef??llte Pflichtfelder in einen semantischen Fehlerzustand
          requiredField.setAttribute("aria-invalid", "true");

          // Assoziiere den Fehlerneldungstext
          requiredField.setAttribute("aria-describedby", idRefRequired);

          // Macht die Fehlermeldungen auch visuell sichtbar
          document.getElementById(idRefRequired).removeAttribute("hidden");
        } else {
          // Feld ausgef??llt? Dann etwaigen Fehlerzustand aufl??sen:

          // Verkn??pfung mit Fehlermeldung aufl??sen
          requiredField.removeAttribute("aria-describedby");
          document.getElementById(idRefRequired).setAttribute("hidden", true);

          // Semantischen Fehlerzustand aufl??sen
          requiredField.removeAttribute("aria-invalid");
        }

        let idRefMismatch = passwordField2.getAttribute(
          "data-pw-mismatch-error"
        );

        // Wenn beide Passwortfelder ausgef??llt sind, aber nicht ??bereinstimmen:
        if (
          passwordField1.value &&
          passwordField2.value &&
          passwordField1.value !== passwordField2.value
        ) {
          passwordField2.setAttribute("aria-describedby", idRefMismatch);
          passwordField2.setAttribute("aria-invalid", "true");
          document.getElementById(idRefMismatch).removeAttribute("hidden");
        } else if (
          // Wenn beide Passwortfelder ausgef??llt sind und ??bereinstimmen:
          passwordField1.value &&
          passwordField2.value &&
          passwordField1.value === passwordField2.value
        ) {
          // Verkn??pfung mit Fehlermeldung aufl??sen
          passwordField2.removeAttribute("aria-describedby");
          document.getElementById(idRefMismatch).setAttribute("hidden", true);

          // Semantischen Fehlerzustand aufl??sen
          passwordField2.removeAttribute("aria-invalid");
        }

        // Loope durch alle E-Mail-Eingabefelder

        /**
         * @param {HTMLElement} emailField
         */
        emailFields.forEach((emailField) => {
          // Hole die ID der Fehlermeldung
          let idRefEmail = emailField.getAttribute("data-email-syntax-error");

          if (emailField.value && !validateEmail(emailField.value)) {
            // Wenn E-Mail-Adresse nicht der ??blichen E-Mail-Syntax entspricht:
            emailField.setAttribute("aria-describedby", idRefEmail);
            document.getElementById(idRefEmail).removeAttribute("hidden");
          } else {
            // Wenn E-Mail der  ??blichen E-Mail-Syntax entspricht:
            emailField.removeAttribute("aria-invalid");
            emailField.removeAttribute("aria-describedby");
            document.getElementById(idRefEmail).hidden = true;
          }
        });
      });

      //
    });
  });
}
