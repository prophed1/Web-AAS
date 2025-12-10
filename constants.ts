import { SectionId } from './types';
import { BookOpen, Flame, Settings, AlertTriangle, Calculator, Activity, Bot } from 'lucide-react';

export const AAS_CONTENT_CONTEXT = `
Anda adalah asisten tutor kimia ahli Spektrometri Serapan Atom (AAS). Gunakan materi berikut sebagai basis pengetahuan utama:

1. KONSEP DASAR:
AAS mempelajari interaksi atom (uap) dengan radiasi UV-Vis (serapan saat atom ground state ke excited state). Energi serapan sebanding dengan konsentrasi. Sangat selektif dan sensitif untuk logam. Beda dengan FES (emisi atom tereksitasi ke ground state).

2. PRINSIP KERJA:
Sampel -> Aerosol (Nebulizer) -> Uap/Atom dalam nyala (Burner). Sumber cahaya (Hollow Cathode Lamp) dilewatkan ke nyala. Atom ground state menyerap radiasi. Absorbansi diukur.

3. KOMPONEN UTAMA:
- Sumber Cahaya: Hollow Cathode Lamp (HCL), spesifik tiap unsur.
- Sistem Pembakaran: Nebulizer (ubah ke aerosol) & Burner (tempat atomisasi).
- Monokromator: Memilih panjang gelombang spesifik.
- Detektor & Rekorder: Ubah sinyal cahaya ke listrik & tampilan data.
- Tipe: Single-beam vs Double-beam (koreksi fluktuasi).

4. NYALA & GAS:
- Oksidising (oksidan berlebih) vs Reducing (fuel berlebih).
- Udara-Asetilen (2450 K) vs N2O-Asetilen (3200 K, untuk oksida stabil seperti Al, Si, Ti).

5. GANGGUAN (INTERFERENSI):
- Spektra, Fisika (viskositas), Kimia (pembentukan oksida stabil).
- Solusi: Naikkan suhu (N2O-Asetilen), tambah modifier, atau ekstraksi matriks.

6. ANALISIS KUANTITATIF:
- Kurva Kalibrasi: Plot Absorbansi vs Konsentrasi standar.
- Adisi Standar: Mengatasi gangguan matriks.
- Standar Internal: Mengoreksi ketidakstabilan instrumen.
`;

export const SECTIONS = [
  {
    id: SectionId.BASICS,
    title: 'Konsep Dasar',
    icon: BookOpen,
    summary: [
      "Interaksi atom uap dengan radiasi UV-Vis.",
      "Mengukur serapan saat transisi ground state -> excited state.",
      "Energi serapan sebanding dengan konsentrasi unsur.",
      "Sangat selektif dan sensitif untuk analisis logam.",
      "Berbeda dengan FES (mengukur emisi) dan AFS (fluoresensi)."
    ],
    content: `
      ### Pengertian AAS
      Atomic Absorption Spectrophotometry (AAS) mempelajari interaksi atom (dalam keadaan uap) dengan radiasi UV‑Vis. Fokus utamanya adalah **serapan radiasi** saat atom naik dari tingkat energi dasar (*ground state*) ke tingkat energi tereksitasi (*excited state*).
      
      ### Hukum Dasar
      Energi radiasi yang diserap sebanding dengan selisih energi kedua tingkat tersebut ($\Delta E = h\nu$). Jumlah energi yang terserap berbanding lurus dengan jumlah atom dalam jalur cahaya, yang berarti sebanding dengan **konsentrasi unsur** dalam nyala.
      
      ### Perbandingan dengan FES
      *   **AAS (Absorpsi):** Mengukur cahaya yang *diserap* oleh atom netral (ground state).
      *   **FES (Emisi):** Mengukur cahaya yang *dipancarkan* saat atom tereksitasi kembali ke ground state.
    `
  },
  {
    id: SectionId.COMPONENTS,
    title: 'Komponen Instrumen',
    icon: Settings,
    summary: [
      "Hollow Cathode Lamp (HCL): Sumber cahaya spesifik unsur.",
      "Nebulizer: Mengubah larutan menjadi aerosol.",
      "Burner: Tempat terjadinya atomisasi dalam nyala.",
      "Monokromator: Memisahkan panjang gelombang analit.",
      "Detektor: Mengubah sinyal optik menjadi listrik."
    ],
    content: `
      ### Prinsip Kerja Singkat
      Larutan sampel $\rightarrow$ Aerosol (Nebulizer) $\rightarrow$ Spray Chamber $\rightarrow$ Burner $\rightarrow$ Atomisasi (Nyala).
      Radiasi HCL dilewatkan nyala $\rightarrow$ Diserap atom ground state $\rightarrow$ Detektor.

      ### Komponen Detail
      1.  **Sumber Cahaya (Hollow Cathode Lamp):** Berisi gas inert bertekanan rendah dengan katoda terbuat dari logam analit yang sama dengan yang dianalisis. Ini menghasilkan garis spektrum yang sangat spesifik dan sempit.
      2.  **Sistem Atomisasi (Burner & Nebulizer):** Nebulizer mengubah cairan menjadi kabut halus. Burner mencampur kabut dengan gas pembakar untuk dibakar. Posisi burner krusial untuk mendapatkan zona atomisasi optimum.
      3.  **Monokromator:** Berfungsi mengisolasi garis resonansi analit dari radiasi lain yang mungkin dipancarkan oleh lampu atau nyala.
      4.  **Sistem Optik:**
          *   *Single-beam:* Sederhana.
          *   *Double-beam:* Sinar dibagi dua (lewat nyala dan bypass). Mengoreksi fluktuasi intensitas lampu dan instrumen.
    `
  },
  {
    id: SectionId.FLAME,
    title: 'Nyala & Gas',
    icon: Flame,
    summary: [
      "Fungsi nyala: desolvasi, volatilisasi, atomisasi.",
      "Udara/Asetilen: ~2450 K (Umum).",
      "N₂O/Asetilen: ~3200 K (Untuk logam refraktori).",
      "Tipe Nyala: Oxidising (lebih oksidan) vs Reducing (lebih fuel)."
    ],
    content: `
      ### Fungsi Nyala
      Nyala tidak hanya membakar, tetapi berfungsi untuk:
      1.  Menguapkan pelarut (desolvasi).
      2.  Membentuk uap garam (volatilisasi).
      3.  Memutus ikatan kimia molekul menjadi atom netral (**atomisasi**).
      
      ### Jenis Gas Pembakar
      Pemilihan pasangan *fuel* (bahan bakar) dan *oxidant* (pengoksidasi) menentukan suhu:
      *   **Udara – Asetilen:** Temperatur $\approx 2450$ K. Paling umum digunakan untuk banyak logam.
      *   **N₂O – Asetilen:** Temperatur $\approx 3200$ K. Diperlukan untuk unsur yang membentuk oksida stabil/refraktori (seperti Al, Si, Ti, lantanida) agar ikatan oksidanya putus.
      
      ### Stoikiometri Nyala
      *   **Oxidising Flame:** Oksidan berlebih. Nyala lebih bening/biru.
      *   **Reducing Flame:** Fuel berlebih. Nyala lebih kuning/kaya karbon. Cocok untuk mencegah pembentukan oksida logam tertentu.
    `
  },
  {
    id: SectionId.INTERFERENCE,
    title: 'Gangguan (Interferensi)',
    icon: AlertTriangle,
    summary: [
      "Kimia: Pembentukan senyawa stabil/oksida.",
      "Fisika: Viskositas, tegangan permukaan.",
      "Spektra: Garis spektrum berimpit (jarang di AAS).",
      "Solusi: Suhu tinggi, releasing agent, ekstraksi."
    ],
    content: `
      ### Jenis Gangguan
      1.  **Gangguan Kimia:** Paling serius. Terjadi jika analit bereaksi dengan anion (misal fosfat, sulfat) membentuk senyawa yang sulit terurai dalam nyala, atau membentuk oksida stabil.
      2.  **Gangguan Fisika:** Perbedaan viskositas atau tegangan permukaan antara standar dan sampel mempengaruhi laju alir ke nebulizer (efisiensi nebulisasi berbeda).
      3.  **Gangguan Spektra:** Tumpang tindih garis absorpsi (jarang terjadi karena garis HCL sangat sempit).
      
      ### Cara Mengatasi
      *   **Menaikkan Suhu Nyala:** Menggunakan N₂O–Asetilen untuk memutus ikatan refraktori.
      *   **Releasing Agent (Modifier):** Menambahkan zat kimia lain. Contoh: Menambahkan Lanthanum (La) atau Strontium (Sr) untuk mengikat fosfat agar Kalsium (Ca) bebas teratomisasi.
      *   **Pemisahan Matriks:** Ekstraksi pelarut untuk memisahkan analit dari pengganggu.
      *   **Standar Adisi:** Untuk mengoreksi efek matriks.
    `
  },
  {
    id: SectionId.QUANTITATIVE,
    title: 'Analisis Kuantitatif',
    icon: Calculator,
    summary: [
      "Hukum Beer-Lambert: A = k·C",
      "Kurva Kalibrasi: Standar eksternal.",
      "Adisi Standar: Koreksi matriks.",
      "Standar Internal: Koreksi instrumen."
    ],
    content: `
      ### Persiapan Sampel
      Sampel AAS biasanya harus encer (kadar unsur < 5%). Pelarut organik (keton, ester) bisa meningkatkan sensitivitas dibanding air. Hindari pelarut aromatik/halogenida yang dapat mengganggu pembakaran.
      
      ### Metode Analisis
      
      #### 1. Kurva Kalibrasi (Standar Eksternal)
      *   Buat seri larutan standar (misal 1, 3, 5, 10 ppm).
      *   Ukur absorbansi masing-masing.
      *   Plot grafik **Absorbansi (y) vs Konsentrasi (x)**.
      *   Cari persamaan garis regresi linear $y = mx + c$.
      *   Ukur sampel, masukkan nilai absorbansi (y) ke persamaan untuk dapat konsentrasi (x).
      
      #### 2. Metode Adisi Standar
      *   Digunakan jika matriks sampel kompleks dan mengganggu.
      *   Volume sampel yang sama dimasukkan ke beberapa labu.
      *   Tambahkan larutan standar dengan konsentrasi bertingkat (0, x, 2x, 3x) ke labu-labu tersebut.
      *   Ekstrapolasi kurva ke sumbu x (negatif) memberikan konsentrasi sampel.
      
      #### 3. Standar Internal
      *   Menambahkan unsur lain yang sifatnya mirip analit tapi tidak ada dalam sampel.
      *   Rasio sinyal analit terhadap sinyal standar internal digunakan untuk perhitungan. Meminimalkan kesalahan akibat fluktuasi nyala atau nebulizer.
    `
  }
];
