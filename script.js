/* =====================================================
   🌍 LinguaBoost AI 3.0 - Intelligence linguistique
   Auteur : BETTAHAR Abdelkrim | Université de Mostaganem
===================================================== */

// 🔑 ضع هنا مفتاح Hugging Face الخاص بك (لا تنشره علنًا)
const HF_TOKEN = "hf_ZfqwZTzIxdJuNYQDdwn-lCKkOgFWpssooUf";

// 📊 Analyse linguistique du texte (modèle français ou arabe)
async function analyzeText() {
  const text = document.getElementById("userText").value.trim();
  if (!text) {
    displayResult("Veuillez entrer un texte à analyser / الرجاء إدخال نص للتحليل");
    return;
  }

  displayResult("⏳ Analyse en cours... / التحليل جارٍ...");

  try {
    // --- Analyse linguistique via modèle HF ---
    const response = await fetch("https://api-inference.huggingface.co/models/pierreguillou/bert-base-cased-squad-v1.1-fr", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: text })
    });

    const data = await response.json();
    displayResult(`<b>🔍 Résumé de l'analyse :</b><br><pre>${JSON.stringify(data, null, 2)}</pre>`);
  } catch (err) {
    displayResult("⚠️ Erreur de connexion au serveur IA / خطأ في الاتصال بخادم الذكاء الاصطناعي");
  }
}

// 🔎 Vérification du plagiat (comparaison sémantique IA)
async function checkPlagiat() {
  const text = document.getElementById("userText").value.trim();
  if (!text) {
    displayResult("Veuillez entrer un texte / الرجاء إدخال نص");
    return;
  }

  displayResult("🔍 Vérification du plagiat en cours...");

  try {
    const sentences = [
      "L'intelligence artificielle transforme notre manière de vivre.",
      "La technologie influence la communication humaine."
    ];

    const payload = {
      inputs: {
        source_sentence: text,
        sentences: sentences
      }
    };

    const response = await fetch("https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    const scores = result?.[0] || [];
    const maxScore = Math.max(...scores.map(Number));
    const percentage = (maxScore * 100).toFixed(2);

    displayResult(`🧩 <b>Similarité détectée :</b> ${percentage}%<br>${percentage > 75 ? "⚠️ Risque élevé de plagiat" : "✅ Aucun plagiat détecté"}`);
  } catch (error) {
    displayResult("Erreur lors de la détection de plagiat.");
  }
}

// 🧹 Effacer le texte et les résultats
function clearText() {
  document.getElementById("userText").value = "";
  document.getElementById("analysisResult").innerHTML = "";
}

// 🌐 Afficher le résultat à l'écran
function displayResult(message) {
  document.getElementById("analysisResult").innerHTML = message;
}

// 🔄 Changer de langue (FR ↔ AR)
function changeLang(lang) {
  if (lang === "ar") {
    window.location.href = "ar.html";
  } else {
    window.location.href = "index.html";
  }
}
