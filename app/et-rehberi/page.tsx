"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

type HotSpot = {
  id: string;
  isim: string;
  /** SVG viewBox="0 0 800 400" piksel koordinatları */
  points: string;
  bilgi: string;
  pisirim: string;
  tarifler?: { ad: string; aciklama: string }[];
};

/* ─────────────────────────────────────────────────────────────
   DANA  –  viewBox 800 × 400  (koordinatlar elle çizildi)
───────────────────────────────────────────────────────────── */
const DANA_SPOTS: HotSpot[] = [
  {
    id: "sokum", isim: "Sokum",
    points: "144,119 188,120 207,66 159,68 136,81 124,104 121,110 143,117",
    bilgi: "But bölümünün üst kısmından elde edilen, yumuşak ve az yağlı yapısıyla dikkat çeken orta sertlikte lifli bir et parçasıdır. Gevrek dokusu sayesinde sote ve kavurma gibi yüksek ateşli pişirme tekniklerinde formunu korur ve muazzam bir lezzet verir.",
    pisirim: "Kuşbaşı veya jülyen doğranarak yüksek ateşte (wok veya döküm tava) kısa süreli sotelenmesi önerilir. Pişirmeden önce asidik bazlı (yoğurt, zeytinyağı, soğan suyu) bir marinasyon işlemi uygulanması sertliği alarak lokum kıvamında sonuçlar almanızı sağlar.",
    tarifler: [{ ad: "Sokum Kavurma", aciklama: "Kendi yağı veya tereyağı ile yüksek ateşte mühürlenip ardından kısık ateşte yavaş yavaş pişirilerek hazırlanan geleneksel sac kavurma." }, { ad: "Et Sote", aciklama: "Jülyen doğranmış sokum etinin renkli biberler, soğan ve domates eşliğinde hızlıca wok tavada sotelenmesi." }],
  },
  {
    id: "tranc", isim: "Tranç",
    points: "125,140 162,139 184,148 174,155 159,160 137,153 125,143",
    bilgi: "But bölgesinin dış yüzeyinden alınan, tamamen yağsız ve yoğun kırmızı renkli löp bir et parçasıdır. Yüzey alanı geniş ve kas yapısı düzgün olduğu için dilimlenmeye son derece uygundur, bu da onu rosto ve döner yapımında bir numaralı tercih haline getirir.",
    pisirim: "Yağsız bir bölge olduğu için kurutmadan pişirmek çok önemlidir. İnce ince dilimlenerek döküm tavada hızlıca pişirilebilir veya fırın torbası/güveç içerisinde kendi buharında ağır ağır rosto şeklinde pişirilebilir. Şiş veya mangal için mutlaka kuyruk yağı ile desteklenmelidir.",
    tarifler: [{ ad: "Fırın Rosto", aciklama: "Bütün haldeki tranç etinin havuç, patates ve sarımsak ile fırın torbasında saatlerce kendi suyunda pişirilmesi." }, { ad: "Ev Yapımı Döner", aciklama: "Dondurulmuş tranç etinin ince yaprak şeklinde kesilip iç yağı veya kuyruk yağı ile tavada kavrulması." }],
  },
  {
    id: "nuar", isim: "Nuar",
    points: "184,150 196,242 158,241 139,226 127,202 117,143 156,160 174,158",
    bilgi: "Hayvanın arka bacak, but iç kısmından çıkarılan, tamamen yağsız, sinirsiz ve sıkı dokulu bir et bölümüdür. Şekil olarak yuvarlak ve uzun bir silindiri andırır. Kesildiğinde muntazam ve dağılmayan dilimler verir.",
    pisirim: "Yağ oranının çok düşük olması sebebiyle ızgara veya tavada doğrudan pişirmek sertleşmesine yol açar. Tencerede sulu yemekler, rosto, uzun süreli fırınlama veya haşlama için en ideal parçadır. Tencere yemeklerinde dilimleyerek kullanılması lokum gibi olmasını sağlar.",
    tarifler: [{ ad: "Nuar Rosto", aciklama: "Salçalı ve biberiyeli özel sosla marine edilmiş nuarın kısık ateşte dilimlenmeden pişirilip sonrasında servis edilmesi." }, { ad: "Tas Kebabı", aciklama: "Kuşbaşı doğranmış nuarın, soğan, patates ve havuç ile birlikte ağır ağır demlenerek pişirildiği leziz tencere yemeği." }],
  },
  {
    id: "incik", isim: "İncik",
    points: "198,294 145,296 148,254 139,227 160,241 197,243 220,246",
    bilgi: "Dana inciği, alt bacaktan elde edilen, ortasında ilikli kemik bulunan ve etin etrafı bağ dokularla (kolajen) çevrili olan özel bir parçadır. Uzun süre pişirildiğinde içindeki kolajen eriyerek ete jölemsi, yumuşacık bir doku ve eşsiz bir şifa katar.",
    pisirim: "Kesinlikle yüksek ısıda hızlı pişirmeye uygun değildir. Tencerede veya güveçte, kendi kemik suyuyla birlikte düşük ateşte 3-4 saat (veya düdüklüde 1 saat) ağır ağır haşlanması gerekir. Fırında pişirilecekse folyoya sarılarak buharında pişirilmelidir.",
    tarifler: [{ ad: "Fırında Sebzeli Dana İncik", aciklama: "Kök sebzeler ve et suyu ile birlikte güveçte veya fırın poşetinde 4 saat boyunca kemikten ayrılana dek pişirilmiş incik." }, { ad: "Osso Buco", aciklama: "Halka şeklinde kesilmiş kemikli inciğin, kereviz sapı, havuç ve domates sosu ile yavaş yavaş pişirildiği İtalyan usulü lezzet." }],
  },
  {
    id: "yumurta", isim: "Yumurta",
    points: "194,241 190,193 186,153 217,144 260,151 245,224 223,239 221,245 197,243",
    bilgi: "But bölümünün kalça eklemine yakın iç kısmından çıkan, ismini yumurtaya benzeyen oval ve pürüzsüz şeklinden alan etli parçadır. But bölgesinin bonfilesi olarak da anılacak kadar yumuşak, bağ dokusu az ve sulu bir ettir.",
    pisirim: "İster dilimleyerek tavada mühürleyip biftek gibi tüketilebilir, ister kuşbaşı doğrayıp sote ve güveçlerde kullanılabilir. Hızlı pişirme yöntemlerine (tava, ızgara) dayanabilen nadir but etlerindendir. Orta veya orta-iyi pişirilmesi tavsiye edilir.",
    tarifler: [{ ad: "Yumurta Kavurma", aciklama: "Yumurta kısmından doğranan yumuşak kuşbaşı etlerin, sadece tuz ve kekik ile sacda kavrulması." }, { ad: "Yumurta Biftek", aciklama: "İnce dilimlenmiş yumurta etinin döküm tavada tereyağı eşliğinde kısa sürede iki yüzlü mühürlenmesi." }],
  },
  {
    id: "penceta", isim: "Pençeta",
    points: "241,227 260,173 262,151 233,148 193,147 185,151 192,117 240,122 280,123 308,123 332,119 339,115 338,186 346,258 316,248 281,229 259,225",
    bilgi: "Karın bölgesinin boşluğundan (kaburga altından) elde edilen, yağ ve et oranının mükemmel bir dengeyle mermerleştiği, oldukça lezzetli bir parçadır. Fransız mutfağında çok değerli olan bu bölüm, uzun ve yassı kaslardan oluşur.",
    pisirim: "Yağlı dokusu sayesinde kendi yağıyla kavrulmaya çok müsaittir. Fırında uzun süre pişirildiğinde çıtır bir dış yüzey ve ağızda dağılan bir iç doku elde edilir. Ayrıca rulo yapılarak (içine baharat sarılarak) rosto gibi fırınlanabilir.",
    tarifler: [{ ad: "Rulo Pençeta", aciklama: "Bütün pençeta etinin arasına taze otlar, sarımsak ve karabiber serpilip rulo şeklinde bağlanarak fırınlanması." }, { ad: "Pençeta Sote", aciklama: "Küçük doğranmış pençetanın ekstra yağ eklenmeden kendi yağıyla ağır ateşte kavrulup çıtırdatılması." }],
  },
  {
    id: "bonfile", isim: "Bonfile",
    points: "190,118 199,90 269,96 331,109 338,115 327,120 286,123 226,121",
    bilgi: "Sığırın sırt kısmında, iç kısıma bakan ve neredeyse hiç hareket etmeyen kas grubundan elde edilir. Hayvanın toplam ağırlığının sadece çok küçük bir kısmını oluşturan bonfile, en az çalışan kas olduğu için olağanüstü derecede yumuşaktır. Yağ oranı oldukça düşüktür.",
    pisirim: "Yağsız yapısından dolayı fazla pişirilirse hızla kurur ve kayış gibi olur. Döküm tavada veya mangalda çok yüksek ateşte 'mühürleme' tekniğiyle dışı kabuk bağlatılmalı, içi ise az (rare) veya orta (medium) pişirilmelidir. Piştikten sonra mutlaka 5-10 dakika tahtada dinlendirilmelidir.",
    tarifler: [{ ad: "Tereyağlı Mantarlı Bonfile", aciklama: "Döküm tavada mühürlenmiş bonfilenin, taze mantar, krema ve karabiberli sos ile bütünleştirilmesi." }, { ad: "Lokum Biftek", aciklama: "Bonfileden kesilen kalın dilimlerin, iri deniz tuzu eşliğinde yüksek ateşli ızgarada hızlıca pişirilmesi." }],
  },
  {
    id: "kontrfile", isim: "Kontrfile",
    points: "199,90 207,65 330,73 352,71 344,104 341,116 330,108 283,98 247,93 224,91",
    bilgi: "Sırt bölgesinde bonfilenin hemen bitişiğinde yer alan, dış tarafında karakteristik ince bir yağ tabakası bulunan birinci sınıf et kesimidir. Bonfileye göre dokusu biraz daha sıkı, lifleri daha belirgindir ancak yağ tabakası sayesinde çok daha güçlü bir et aromasına sahiptir.",
    pisirim: "Üzerindeki yağ tabakasını ayırmadan ızgara veya tavada bütün olarak mühürlenmelidir. Yağ eridikçe ete o muazzam lezzeti verecektir. İdeal pişirme derecesi orta-az veya ortadır (medium). Uzun süre ateşte bırakılırsa kurur.",
    tarifler: [{ ad: "New York Steak", aciklama: "Kalın kesim kontrfilenin döküm tavada taze biberiye, sarımsak ve tereyağı ile yıkanarak (basting) mühürlenmesi." }, { ad: "Kontrfile Izgara", aciklama: "Sadece zeytinyağı ve taze çekilmiş karabiberle dinlendirilmiş etin kömür ateşinde pişirilmesi." }],
  },
  {
    id: "antrikot", isim: "Antrikot",
    points: "352,73 424,70 450,71 471,118 445,113 410,114 372,120 341,132 340,115",
    bilgi: "Sırtın ön kısmından, boyun ve kontrfile arasında kalan bölgeden çıkarılan, ortasındaki kalın yağ damarı (mermerleşme) ile meşhur olan en lezzetli biftek kesimlerinden biridir. İçerisindeki yağ dokusu piştikçe eriyerek eti inanılmaz derecede sulu ve yumuşak yapar.",
    pisirim: "Kesinlikle çok yüksek ısılı döküm tava veya harlı mangal ateşinde pişirilmelidir. Önceden tuza bulanıp oda sıcaklığına getirilmiş kalın bir antrikot, ikişer dakika her iki yüzü mühürlenerek içi sulu bırakılmalıdır. Tencere veya sulu yemeği yapılmaz.",
    tarifler: [{ ad: "Döküm Tavada Antrikot (Ribeye)", aciklama: "Oda sıcaklığına getirilmiş kalın antrikotun yüksek ısıda mühürlenip deniz tuzu ile servis edilmesi." }, { ad: "Cafe de Paris Soslu Antrikot", aciklama: "Mühürlenmiş etin, hardal, tereyağı ve özel baharatlardan oluşan meşhur Fransız sosu ile sunulması." }],
  },
  {
    id: "kurek", isim: "Kürek",
    points: "340,132 340,179 415,160 452,155 495,158 471,117 425,113 378,119",
    bilgi: "Ön kolların (omuzların) üst kısmından, kürek kemiğinin etrafından çıkarılan sert, bol hareket görmüş kaslı bir ettir. Ortasından belirgin bir kıkırdak veya sinir hattı geçer, yoğun bir kırmızı et aromasına sahiptir.",
    pisirim: "Kısa süreli pişirmelerde çok sert olacağı için marinasyon şarttır ya da en iyisi ağır ateşte 'braising' denilen kendi suyuyla uzun süre pişirme (güveç, kapama) yöntemidir. Uzun piştiğinde o sert sinirler kolajene dönüşür ve et lime lime ayrılır.",
    tarifler: [{ ad: "Dana Kürek Güveç", aciklama: "Kuşbaşı doğranmış kürek etinin, arpacık soğan, domates ve sarımsakla toprak güveçte saatlerce demlenmesi." }, { ad: "Fırın Kapama", aciklama: "Bütün kürek etinin fırın poşetinde defne yaprağı ve tane karabiber eşliğinde kemikten ayrılana kadar pişirilmesi." }],
  },
  {
    id: "gerdan", isim: "Gerdan",
    points: "448,69 494,68 518,65 529,60 538,89 554,118 571,137 585,149 560,180 527,165 497,158 471,116",
    bilgi: "Hayvanın boyun bölgesinden gelen, bol hareket eden güçlü kaslardan ve zengin bağ dokularından (kolajen) oluşan bir parçadır. İçerisindeki kemik ve yoğun lifli yapı, ona tüm hayvanın en güçlü tat profillerinden birini verir.",
    pisirim: "Asla tava veya ızgaraya uygun değildir. İçindeki sert dokuların eriyip jöleleşmesi ve eti yumuşatması için kısık ateşte çok uzun saatler sıvı içinde haşlanması gerekir. Düdüklü tencere en büyük dostudur (1-1.5 saat). Çorbalara ve et sularına harika bir lezzet verir.",
    tarifler: [{ ad: "Gerdan Haşlama", aciklama: "Bütün gerdanın patates, havuç, kereviz sapı ve bütün soğan eşliğinde kısık ateşte ilik suyuyla pişmesi." }, { ad: "Etli Düğün Çorbası", aciklama: "Gerdan etinin uzun süre haşlanıp didiklenmesi ve kendi suyu kullanılarak terbiyeli bir çorbaya dönüştürülmesi." }],
  },
  {
    id: "kol", isim: "Kol",
    points: "415,160 417,189 434,226 479,230 510,227 523,209 525,180 525,165 495,158 455,155",
    bilgi: "Ön bacağın üst kas grubudur. Hayvanın yükünü çeken bölümlerden biri olduğu için kas yapısı sert, lifleri sıkı ve yağ oranı göreceli olarak düşüktür. Ancak kolajen açısından zengin olduğu için uzun pişirmeye müthiş tepki verir.",
    pisirim: "Kuşbaşı doğranıp yahnilerde, tas kebabında veya haşlamalarda kullanılmalıdır. Kıyması (özellikle döş ile karıştırıldığında) köfte ve yemeklik kıyma olarak eşsiz bir denge sağlar. Fırında sebzelerle birlikte yavaş pişirme (rosto) de çok başarılı olur.",
    tarifler: [{ ad: "Orman Kebabı", aciklama: "Kuşbaşı kol etinin, bezelye, havuç ve patatesle zenginleştiği efsanevi sulu yemek." }, { ad: "Klasik Köfte", aciklama: "Kol etinin sıkılığı ile döşün yağı harmanlanarak çekilen kıymadan yapılan anne köftesi." }],
  },
  {
    id: "dos", isim: "Döş",
    points: "339,178 415,161 416,187 423,210 435,227 443,265 410,263 378,266 347,264 341,213",
    bilgi: "Göğüs bölgesinin alt kısımlarından elde edilen, kaburga üstünü de kapsayan geniş, yağlı ve kemikli olabilen bir parçadır (Brisket). Sığırın en lezzetli yağlarına ev sahipliği yapar ve kıymalık etin en kıymetli kaynağıdır.",
    pisirim: "Yağlı yapısı sebebiyle sucuk, sosis ve köfte kıyması yapımında tek başına veya kol etiyle yarı yarıya karıştırılarak kullanılır. Bütün olarak (Brisket) pişirilecekse, düşük ısılı barbeküde veya fırında 8-12 saat arası 'slow-cook' (yavaş pişirme) ile tütsülenerek hazırlanır.",
    tarifler: [{ ad: "Tütsülenmiş Brisket (Döş Rosto)", aciklama: "Özel baharatlarla ovulmuş bütün döş etinin barbeküde dumanla 10 saatte ağır ağır pişirilmesi." }, { ad: "Döş Kıymasından Satır Köfte", aciklama: "Sadece döş etinden çift çekim kıyma, soğan ve baharat ile hazırlanan ızgara köftesi." }],
  },
  {
    id: "incik", isim: "İncik",
    points: "434,226 443,265 448,294 485,298 495,258 511,228 470,230",
    bilgi: "Dana inciği, alt bacaktan elde edilen, ortasında ilikli kemik bulunan ve etin etrafı bağ dokularla (kolajen) çevrili olan özel bir parçadır. Uzun süre pişirildiğinde içindeki kolajen eriyerek ete jölemsi, yumuşacık bir doku ve eşsiz bir şifa katar.",
    pisirim: "Kesinlikle yüksek ısıda hızlı pişirmeye uygun değildir. Tencerede veya güveçte, kendi kemik suyuyla birlikte düşük ateşte 3-4 saat (veya düdüklüde 1 saat) ağır ağır haşlanması gerekir. Fırında pişirilecekse folyoya sarılarak buharında pişirilmelidir.",
    tarifler: [{ ad: "Fırında Sebzeli Dana İncik", aciklama: "Kök sebzeler ve et suyu ile birlikte güveçte veya fırın poşetinde 4 saat boyunca kemikten ayrılana dek pişirilmiş incik." }, { ad: "Osso Buco", aciklama: "Halka şeklinde kesilmiş kemikli inciğin, kereviz sapı, havuç ve domates sosu ile yavaş yavaş pişirildiği İtalyan usulü lezzet." }],
  },
  {
    id: "nuar", isim: "Nuar",
    points: "118,141 162,138 185,149 190,119 145,118 123,111 121,128",
    bilgi: "Hayvanın arka bacak, but iç kısmından çıkarılan, tamamen yağsız, sinirsiz ve sıkı dokulu bir et bölümüdür. Şekil olarak yuvarlak ve uzun bir silindiri andırır. Kesildiğinde muntazam ve dağılmayan dilimler verir.",
    pisirim: "Yağ oranının çok düşük olması sebebiyle ızgara veya tavada doğrudan pişirmek sertleşmesine yol açar. Tencerede sulu yemekler, rosto, uzun süreli fırınlama veya haşlama için en ideal parçadır. Tencere yemeklerinde dilimleyerek kullanılması lokum gibi olmasını sağlar.",
    tarifler: [{ ad: "Nuar Rosto", aciklama: "Salçalı ve biberiyeli özel sosla marine edilmiş nuarın kısık ateşte dilimlenmeden pişirilip sonrasında servis edilmesi." }, { ad: "Tas Kebabı", aciklama: "Kuşbaşı doğranmış nuarın, soğan, patates ve havuç ile birlikte ağır ağır demlenerek pişirildiği leziz tencere yemeği." }],
  },
];

/* ─────────────────────────────────────────────────────────────
   KUZU  –  viewBox 800 × 400
───────────────────────────────────────────────────────────── */
const KUZU_SPOTS: HotSpot[] = [
  {
    id: "gerdan", isim: "Gerdan",
    points: "247,123 279,120 303,102 323,106 316,124 294,142 264,157 247,160 246,141",
    bilgi: "Kuzunun boyun kısmıdır. Yağ dokusu etin içine mükemmel bir şekilde ince ince işlenmiştir (mermerleşme). Hem kemikli hem de çok hareket eden bir kas olduğu için lezzet bakımından kuzunun en zengin ve en karakteristik parçalarından biridir.",
    pisirim: "Kıkırdak ve kolajen yapısının eriyerek suya karışması için mutlaka uzun ve sulu pişirme (haşlama, güveç, tencere) yöntemleri tercih edilmelidir. Kısık ateşte kendi suyunu bırakana dek 2-3 saat pişirildiğinde etler tel tel dökülür.",
    tarifler: [{ ad: "Terbiyeli Kuzu Gerdan Çorbası", aciklama: "Ağır ateşte haşlanan gerdan etlerinin didiklenip, limon ve yumurta sarısı ile hazırlanan terbiye ile birleştirilmesi." }, { ad: "Gerdan Haşlama", aciklama: "Kemikli gerdan parçalarının patates, soğan ve havuç eşliğinde suyuna ekmek banmalık şifa deposu hali." }],
  },
  {
    id: "pirzola", isim: "Pirzola",
    points: "343,108 350,120 353,147 353,155 411,157 443,153 438,119 438,98 380,107",
    bilgi: "Kuzunun sırt kısmında (kaburga kemiklerinin sırta bağlandığı yer) bulunan, kemikli olarak dilimlenen ve tüm kuzu etleri arasında en değerli, en yumuşak ve en bilinen kesimdir. Et kalitesi ve inceliği sayesinde ağızda adeta erir.",
    pisirim: "Fazla pişirmeye asla gelmez. İdeal olanı meşe odunu veya kömür ateşinde, ya da döküm tavada yüksek ısıda hızlıca (her yüzü 2-3 dakika) pişirilmesidir. Hafif pembe kalması, etin kurumasını engeller ve sululuğunu korur. Sadece tuz ve kekiğe ihtiyaç duyar.",
    tarifler: [{ ad: "Mangalda Kuzu Pirzola", aciklama: "Zeytinyağı ve taze kekik ile çok hafif dinlendirilen pirzolaların kömür ateşinde mühürlenerek içi sulu kalacak şekilde pişirilmesi." }, { ad: "Fırınlanmış Bütün Kafes", aciklama: "Pirzolaların birbirinden ayrılmadan bütün bir kafes (rack of lamb) halinde fırınlanıp görkemli bir sunumla servis edilmesi." }],
  },
  {
    id: "but", isim: "But",
    points: "438,98 439,128 445,158 449,188 450,205 463,232 486,247 502,257 508,279 519,260 534,251 521,220 533,206 534,191 540,172 555,196 558,185 549,152 533,122 510,103 485,98",
    bilgi: "Kuzunun arka bacak bölgesidir ve gövdedeki en kalabalık et kütlesini oluşturur. Kola göre daha az yağlı ancak oldukça lop ve etli bir yapıya sahiptir. Bu bölgeden 'külbastı' ve 'şişlik' etler çıkarılır.",
    pisirim: "Bütün olarak fırında (rosto) veya tandırda yavaş yavaş pişirilebileceği gibi, kemiksiz hale getirilip kuşbaşı doğranarak şişte veya tavada kavurma olarak da tüketilebilir. Fırınlama yapılacaksa etin kurumasını önlemek için sarımsak ve biberiye ile derin çizikler atarak marine edilmeli, kendi buharında pişmelidir.",
    tarifler: [{ ad: "Kuzu Külbastı", aciklama: "Buttan yaprak gibi ince açılan etlerin hafif marinasyon sonrası tavada saniyeler içinde pişirilmesi." }, { ad: "İç Pilavlı Kuzu But", aciklama: "Fırında ağır ateşte nar gibi kızarana kadar pişirilmiş bütün kuzu but ve yanında baharatlı, fıstıklı iç pilav." }],
  },
  {
    id: "kol", isim: "Kol",
    points: "245,161 267,156 290,144 308,132 318,120 323,105 344,107 349,121 353,148 351,208 355,229 350,264 335,269 316,270 314,269 311,251 300,234 280,224 266,207",
    bilgi: "Ön bacak kaslarıdır. But kısmına kıyasla daha çok çalışmış bir kas grubu olduğu için bir miktar daha serttir ancak yağ dağılımı (marmorizasyon) buttan çok daha iyidir. Bu da ona güveçlerde ve fırında çok daha derin ve eşsiz bir lezzet verir.",
    pisirim: "Yağlı dokusu sayesinde fırın ve tencere yemeklerinin (kapama, güveç) vazgeçilmezidir. Kemikli olarak bütün halde kısık ateşte 3 saat pişirildiğinde kemikten kendiliğinden sıyrılan o meşhur 'tandır' kıvamını alır.",
    tarifler: [{ ad: "Kuzu Kapama", aciklama: "Parçalanmış kuzu kolunun bol taze soğan, marul ve dereotu yatağında çok kısık ateşte demlenerek pişirilmesi." }, { ad: "Fırın Tandır", aciklama: "Kuzu kolun üzerine yoğurt ve salça sürülerek folyoya sarılı şekilde fırında lime lime olana dek saatlerce kızartılması." }],
  },
  {
    id: "kaburga", isim: "Kaburga",
    points: "353,156 352,201 402,207 450,205 443,154 395,156",
    bilgi: "Kuzunun göğüs kafesini oluşturan, ince kemikler ve bu kemiklerin arasına saklanmış yoğun yağlı, inanılmaz lezzetli et parçalarından oluşur. Kuzunun en tatlı ve yağlı bölgesidir, mangalcıların favorisidir.",
    pisirim: "Kendi yağı çok yoğun olduğu için ekstra yağ eklenmez. Bütün halde ızgarada veya fırında yavaş yavaş pişirilerek yağının eriyip eti çıtırdatması sağlanır. Ayrıca bütün kaburga içi pilavla doldurularak fırına verilebilir.",
    tarifler: [{ ad: "Kaburga Dolması", aciklama: "Bütün kaburganın cep gibi açılıp içinin bol fıstıklı, bademli, baharatlı iç pilavla doldurulup iplikle dikilerek fırınlanması." }, { ad: "Izgara Kaburga Şeritleri", aciklama: "Kaburganın dilimlenerek ızgara ateşinde kendi yağıyla nar gibi çıtırdayana dek pişirilmesi." }],
  },
  {
    id: "bosluk", isim: "Boşluk",
    points: "351,203 355,232 420,239 460,234 462,230 449,205 399,207 369,205",
    bilgi: "Kaburganın bitiminden sonraki karın boşluğu bölümüdür (Kuzu döşü olarak da bilinir). Et ve yağ katmanlarının üst üste bindiği ince, yassı ve oldukça lezzetli bir parçadır.",
    pisirim: "Bol yağlı yapısı nedeniyle kavurmalarda, güveç tabanlarında lezzet arttırıcı olarak veya sarma / rulo yemeklerinde kullanılır. Kıyma yapımına katılarak köfte harcına muazzam bir yağlılık ve aroma kazandırır.",
    tarifler: [{ ad: "Kuzu Döş Sarma", aciklama: "Düzleştirilmiş boşluk etinin arasına baharat ve pirinç sarılarak fırın tepsisinde ağır ateşte pişirilmesi." }, { ad: "Bol Yağlı Kuzu Kavurma", aciklama: "Kendi yağıyla birlikte sacda veya bakır tavada yumuşayana kadar kavrulan lokum gibi et." }],
  },
  {
    id: "incik", isim: "İncik",
    points: "285,229 292,253 293,276 292,299 282,325 335,324 333,313 340,300 349,265 319,272 313,269 312,251 296,231 288,228",
    bilgi: "Kuzunun hem ön (kol) hem de arka (but) bacaklarının diz altı bölümüdür. İçi yoğun ilikli kemiğe ve etrafı çok güçlü kolajen ve sinir dokusuna sahip sert ama bir o kadar da mucizevi bir parçadır.",
    pisirim: "Braising (az sıvıda, kapalı tencerede, düşük ısıda uzun süre pişirme) için yaratılmıştır. Izgarada veya tavada kesinlikle pişmez. Fırında veya döküm tencerede kök sebzeler ve et suyu ile 3-4 saat piştiğinde kolajen erir, et kemikten 'lop' diye ayrılır.",
    tarifler: [{ ad: "Patlıcan Beğendili Kuzu İncik", aciklama: "Fırında saatlerce pişmiş lokum gibi inciğin, közlenmiş patlıcan ve peynirli sıcak beğendi yatağında sunumu." }, { ad: "Şehriyeli İncik Haşlama", aciklama: "Kemik suyunun tüm şifasını saldığı, etlerin lime lime ayrıldığı, arpa şehriyeli sıcak kış yemeği." }],
  },
  {
    id: "incik", isim: "İncik",
    points: "459,234 462,230 478,242 495,253 503,260 507,280 518,263 534,253 539,260 537,285 531,310 526,331 518,336 500,333 475,324 487,293 490,278 483,260",
    bilgi: "Kuzunun hem ön (kol) hem de arka (but) bacaklarının diz altı bölümüdür. İçi yoğun ilikli kemiğe ve etrafı çok güçlü kolajen ve sinir dokusuna sahip sert ama bir o kadar da mucizevi bir parçadır.",
    pisirim: "Braising (az sıvıda, kapalı tencerede, düşük ısıda uzun süre pişirme) için yaratılmıştır. Izgarada veya tavada kesinlikle pişmez. Fırında veya döküm tencerede kök sebzeler ve et suyu ile 3-4 saat piştiğinde kolajen erir, et kemikten 'lop' diye ayrılır.",
    tarifler: [{ ad: "Patlıcan Beğendili Kuzu İncik", aciklama: "Fırında saatlerce pişmiş lokum gibi inciğin, közlenmiş patlıcan ve peynirli sıcak beğendi yatağında sunumu." }, { ad: "Şehriyeli İncik Haşlama", aciklama: "Kemik suyunun tüm şifasını saldığı, etlerin lime lime ayrıldığı, arpa şehriyeli sıcak kış yemeği." }],
  },
];

const DEFAULT_BILGI = {
  dana: {
    baslik: "Dana Eti",
    bilgi: "Dana eti, zengin besin değeri ve yoğun lezzetiyle sofralarımızın vazgeçilmezidir. Yüksek kaliteli protein kaynağı olan dana eti, doğru bölümleri seçildiğinde ızgaradan tencere yemeklerine kadar mükemmel sonuçlar verir.",
    pisirim: "",
  },
  kuzu: {
    baslik: "Kuzu Eti",
    bilgi: "Kuzu eti, kendine has yumuşak dokusu ve aromatik lezzetiyle özel davetlerin ve geleneksel mutfağımızın baş tacıdır. Doğru pişirme teknikleriyle kuzu etinin eşsiz lezzetini her öğünde doyasıya yaşayabilirsiniz.",
    pisirim: "",
  },
};

export default function EtRehberi() {
  const [hayvan, setHayvan] = useState<"dana" | "kuzu">("dana");
  const [secilen, setSecilen] = useState<HotSpot | null>(null);
  const [hovered, setHovered]   = useState<string | null>(null);
  const dirRef = useRef(1);

  const spots  = hayvan === "dana" ? DANA_SPOTS : KUZU_SPOTS;
  const gorsel = hayvan === "dana" ? "/et-bolumleri/dana.jpg" : "/et-bolumleri/kuzu.jpg";

  const handleHayvan = (h: "dana" | "kuzu") => {
    dirRef.current = h === "kuzu" ? 1 : -1;
    setHayvan(h);
    setSecilen(null);
    setHovered(null);
  };

  return (
    <>
      <main
      className="min-h-screen flex flex-col items-center pt-[120px] md:pt-[160px] pb-20"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      {/* Başlık */}
      <div className="w-full max-w-[1800px] px-2 md:px-4 text-left">
        <h1
          className="font-serif text-4xl md:text-6xl font-bold mb-2 tracking-tight"
          style={{ color: "#BD2333" }}
        >
          Et Rehberi
        </h1>
        <p className="text-neutral-500 text-base mb-10">
          Bölüme tıklayarak pişirme kılavuzuna ulaşın
        </p>
      </div>

      {/* Hayvan seçici */}
      <div className="flex items-center gap-8 mb-10">
        {(["dana", "kuzu"] as const).map((h) => (
          <button
            key={h}
            onClick={() => handleHayvan(h)}
            className="font-black text-2xl uppercase tracking-tight transition-all duration-300 border-b-2 pb-0.5"
            style={{
              color: "#BD2333",
              opacity: hayvan === h ? 1 : 0.35,
              borderColor: hayvan === h ? "#BD2333" : "transparent",
            }}
          >
            {h === "dana" ? "Dana" : "Kuzu"}
          </button>
        ))}
      </div>

      {/* Seçilen hayvana göre sabit bilgi metni */}
      <div className="w-full max-w-[1800px] px-2 md:px-4 mb-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={hayvan}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#BD2333" }}
            >
              {DEFAULT_BILGI[hayvan].baslik}
            </h2>
            <p className="text-neutral-700 text-base md:text-lg">
              {DEFAULT_BILGI[hayvan].bilgi}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* İçerik Alanı: Resim ve Bilgi Yan Yana */}
      <div className={`w-full max-w-[1800px] px-2 md:px-4 flex flex-col ${hayvan === "dana" ? "md:flex-row" : "md:flex-row-reverse"} gap-10 items-start`}>
        
        {/* Sol/Sağ: Resim + SVG overlay */}
        <div className="w-full md:w-[55%] shrink-0">
          <AnimatePresence mode="wait" custom={dirRef.current}>
            <motion.div
              key={hayvan}
              custom={dirRef.current}
              variants={{
                initial: (dir: number) => ({ x: dir >= 0 ? "20%" : "-20%", opacity: 0 }),
                animate: { x: "0%", opacity: 1 },
                exit:    (dir: number) => ({ x: dir >= 0 ? "-20%" : "20%", opacity: 0 }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full"
              style={{ aspectRatio: "2 / 1" }}
            >
              <Image
                src={gorsel}
                alt={hayvan === "dana" ? "Dana eti bölümleri" : "Kuzu eti bölümleri"}
                fill
                className="object-contain"
                priority
              />

              {/* SVG polygon overlay */}
              <svg
                viewBox="0 0 800 400"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {spots.map((spot, index) => {
                  const isSel = secilen?.id === spot.id;
                  const isHov = hovered  === spot.id;
                  return (
                    <polygon
                      key={`${spot.id}-${index}`}
                      points={spot.points}
                      fill={
                        isSel ? "rgba(191,33,48,0.25)"
                        : isHov ? "rgba(191,33,48,0.13)"
                        : "rgba(0,0,0,0)"
                      }
                      stroke={
                        isSel ? "rgba(191,33,48,0.80)"
                        : isHov ? "rgba(191,33,48,0.50)"
                        : "rgba(0,0,0,0)"
                      }
                      strokeWidth={isSel || isHov ? 1.5 : 0}
                      className="cursor-pointer"
                      style={{ transition: "fill 0.15s, stroke 0.15s" }}
                      onClick={() => setSecilen(isSel ? null : spot)}
                      onMouseEnter={() => setHovered(spot.id)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  );
                })}
              </svg>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sağ/Sol: Seçilen parçanın bilgisi */}
        <div className="flex-1 w-full min-h-[25rem] md:h-[660px] md:overflow-y-auto pr-0 md:pr-4 scrollbar-thin">
          <AnimatePresence mode="wait">
            {secilen ? (
              <motion.div
                key={secilen.id + "-" + hayvan}
                initial={{ opacity: 0, x: hayvan === "dana" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: hayvan === "dana" ? -20 : 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2
                  className="font-serif text-3xl md:text-5xl font-bold mb-4"
                  style={{ color: "#BD2333" }}
                >
                  {secilen.isim}
                </h2>
                <p className="text-neutral-700 text-lg md:text-xl leading-relaxed mb-6">
                  {secilen.bilgi}
                </p>
                
                {secilen.pisirim && (
                  <div className="mb-8">
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="text-xs font-black uppercase tracking-widest"
                        style={{ color: "#BD2333" }}
                      >
                        Pişirme Kılavuzu
                      </span>
                      <div className="flex-1 h-px bg-neutral-300" />
                    </div>
                    <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
                      {secilen.pisirim}
                    </p>
                  </div>
                )}
                
                {secilen.tarifler && secilen.tarifler.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="text-xs font-black uppercase tracking-widest"
                        style={{ color: "#BD2333" }}
                      >
                        Örnek Tarifler
                      </span>
                      <div className="flex-1 h-px bg-neutral-300" />
                    </div>
                    <ul className="space-y-4">
                      {secilen.tarifler.map((t, idx) => (
                        <li key={idx} className="text-neutral-700 text-sm md:text-base leading-relaxed bg-white/60 p-5 rounded-2xl border border-neutral-200/50 shadow-sm">
                          <strong className="block text-lg mb-1" style={{ color: "#BD2333" }}>{t.ad}</strong>
                          {t.aciklama}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[25rem] md:min-h-full w-full flex items-center justify-center text-center px-10 border-2 border-dashed border-neutral-300 rounded-3xl py-12"
              >
                <p className="text-neutral-400 text-xl font-medium">
                  Haritadaki et bölümüne tıklayarak o bölgeye ait bilgi ve pişirme kılavuzuna ulaşabilirsiniz.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </main>
    <Footer />
  </>
);
}
