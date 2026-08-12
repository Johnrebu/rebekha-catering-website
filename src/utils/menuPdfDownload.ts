import jsPDF from "jspdf";

interface MenuPackageData {
  title: string;
  subtitle: string;
  price: number;
  priceLabel: string;
  items: string[];
  note: string;
  packageType: "nonveg" | "veg";
}

// ─── Colour palette ────────────────────────────────────────────────────────────
const C = {
  darkBrown:  [30,  17,   9] as [number, number, number],
  gold:       [194, 138,  57] as [number, number, number],
  goldLight:  [224, 183, 105] as [number, number, number],
  cream:      [253, 248, 238] as [number, number, number],
  creamDark:  [243, 233, 210] as [number, number, number],
  white:      [255, 255, 255] as [number, number, number],
  textDark:   [35,  22,  10] as [number, number, number],
  textMid:    [90,  65,  35] as [number, number, number],
  textLight:  [150, 120,  80] as [number, number, number],
  green:      [60, 140,  80] as [number, number, number],
  red:        [180,  60,  40] as [number, number, number],
};

function setFill(doc: jsPDF, rgb: [number, number, number]) {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
}
function setDraw(doc: jsPDF, rgb: [number, number, number]) {
  doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
}
function setTextColor(doc: jsPDF, rgb: [number, number, number]) {
  doc.setTextColor(rgb[0], rgb[1], rgb[2]);
}

// ─── Decorative helpers ────────────────────────────────────────────────────────

/** Draw a thin double-rule ornamental divider */
function drawDivider(doc: jsPDF, x: number, y: number, w: number) {
  setDraw(doc, C.gold);
  doc.setLineWidth(0.8);
  doc.line(x, y, x + w, y);
  doc.setLineWidth(0.2);
  doc.line(x, y + 1.8, x + w, y + 1.8);
}

/** Small diamond ornament */
function drawDiamond(doc: jsPDF, cx: number, cy: number, size = 2) {
  setFill(doc, C.gold);
  doc.triangle(
    cx, cy - size,
    cx + size, cy,
    cx, cy + size,
    "F"
  );
  doc.triangle(
    cx, cy - size,
    cx - size, cy,
    cx, cy + size,
    "F"
  );
}

/** Corner accent lines */
function drawCornerAccents(doc: jsPDF, x: number, y: number, w: number, h: number, len = 10) {
  setDraw(doc, C.gold);
  doc.setLineWidth(1.2);
  // TL
  doc.line(x, y, x + len, y);
  doc.line(x, y, x, y + len);
  // TR
  doc.line(x + w, y, x + w - len, y);
  doc.line(x + w, y, x + w, y + len);
  // BL
  doc.line(x, y + h, x + len, y + h);
  doc.line(x, y + h, x, y + h - len);
  // BR
  doc.line(x + w, y + h, x + w - len, y + h);
  doc.line(x + w, y + h, x + w, y + h - len);
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function downloadMenuPDF(data: MenuPackageData): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const PW = 210;
  const PH = 297;
  const MARGIN = 12;
  const IW = PW - MARGIN * 2; // inner width

  // ── 1. Full-page cream background ──────────────────────────────────────────
  setFill(doc, C.cream);
  doc.rect(0, 0, PW, PH, "F");

  // ── 2. Dark header band ─────────────────────────────────────────────────────
  setFill(doc, C.darkBrown);
  doc.rect(0, 0, PW, 52, "F");

  // Gold top border stripe
  setFill(doc, C.gold);
  doc.rect(0, 0, PW, 2.5, "F");

  // Gold bottom border stripe
  doc.rect(0, 49.5, PW, 2.5, "F");

  // ── 3. Brand name ───────────────────────────────────────────────────────────
  setTextColor(doc, C.gold);
  doc.setFont("times", "bolditalic");
  doc.setFontSize(28);
  doc.text("Rebekha Caterers", PW / 2, 22, { align: "center" });

  // Tagline
  setTextColor(doc, C.goldLight);
  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.text("Serving Love, Tradition & Unforgettable Memories Since 1998", PW / 2, 29, { align: "center" });

  // Contact strip
  setTextColor(doc, C.creamDark);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  // Contact strip — three plain-text segments (no emoji) to avoid glyph issues
  const contactY = 36;
  doc.text("Ph: 94454 35102  |  94454 35103", PW / 2 - 60, contactY, { align: "left" });
  setTextColor(doc, C.gold);
  doc.text("*", PW / 2 - 3, contactY, { align: "center" });
  doc.text("*", PW / 2 + 40, contactY, { align: "center" });
  setTextColor(doc, C.creamDark);
  doc.text("rebekhacaterers@gmail.com", PW / 2 + 2, contactY, { align: "left" });
  doc.text("West Tambaram, Chennai - 600 045", PW / 2 + 44, contactY, { align: "left" });

  // Header subtitle: "OFFICIAL MENU CARD"
  setTextColor(doc, C.goldLight);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text("O F F I C I A L   M E N U   C A R D", PW / 2, 44, { align: "center" });

  // ── 4. Outer border frame ───────────────────────────────────────────────────
  setDraw(doc, C.gold);
  doc.setLineWidth(0.5);
  doc.rect(MARGIN - 1, MARGIN - 1, IW + 2, PH - MARGIN * 2 + 2);
  doc.setLineWidth(0.15);
  doc.rect(MARGIN + 1, MARGIN + 1, IW - 2, PH - MARGIN * 2 - 2);

  drawCornerAccents(doc, MARGIN - 1, MARGIN - 1, IW + 2, PH - MARGIN * 2 + 2, 8);

  // ── 5. Package name banner ──────────────────────────────────────────────────
  let curY = 60;

  setFill(doc, C.creamDark);
  doc.roundedRect(MARGIN + 4, curY, IW - 8, 14, 1, 1, "F");
  setDraw(doc, C.gold);
  doc.setLineWidth(0.4);
  doc.roundedRect(MARGIN + 4, curY, IW - 8, 14, 1, 1, "S");

  setTextColor(doc, C.darkBrown);
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text(data.title, PW / 2, curY + 9.5, { align: "center" });

  curY += 20;

  // Subtitle (biryani option label)
  if (data.subtitle) {
    setTextColor(doc, C.textMid);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(data.subtitle, PW / 2, curY, { align: "center" });
    curY += 6;
  }

  // ── 6. Price badge ──────────────────────────────────────────────────────────
  const badgeW = 58;
  const badgeH = 24;
  const badgeX = (PW - badgeW) / 2;

  setFill(doc, C.darkBrown);
  doc.roundedRect(badgeX, curY, badgeW, badgeH, 2, 2, "F");
  setDraw(doc, C.gold);
  doc.setLineWidth(0.6);
  doc.roundedRect(badgeX, curY, badgeW, badgeH, 2, 2, "S");

  setTextColor(doc, C.gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text("PRICE PER PLATE", PW / 2, curY + 6, { align: "center" });

  setTextColor(doc, C.white);
  doc.setFont("times", "bold");
  doc.setFontSize(20);
  // Use "Rs." instead of "₹" – the rupee symbol renders as "1" in jsPDF's built-in fonts
  doc.text(`Rs. ${data.price}`, PW / 2, curY + 17, { align: "center" });

  curY += badgeH + 8;

  drawDivider(doc, MARGIN + 6, curY, IW - 12);
  drawDiamond(doc, PW / 2, curY + 1);
  curY += 10;

  // ── 7. "MENU INCLUDES" heading ──────────────────────────────────────────────
  setTextColor(doc, C.darkBrown);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("M E N U   I N C L U D E S", PW / 2, curY, { align: "center" });
  curY += 7;

  // ── 8. Menu items grid (2 columns) ─────────────────────────────────────────
  const itemsPerCol = Math.ceil(data.items.length / 2);
  const colW = (IW - 8) / 2;
  const colX = [MARGIN + 4, MARGIN + 4 + colW + 4];
  const ROW_H = 9;

  data.items.forEach((item, i) => {
    const col = i < itemsPerCol ? 0 : 1;
    const row = col === 0 ? i : i - itemsPerCol;
    const x = colX[col];
    const y = curY + row * ROW_H;

    // Card background (alternating)
    const isEven = row % 2 === 0;
    setFill(doc, isEven ? C.white : C.creamDark);
    doc.roundedRect(x, y - 5.5, colW, ROW_H - 1, 1, 1, "F");
    setDraw(doc, C.creamDark);
    doc.setLineWidth(0.15);
    doc.roundedRect(x, y - 5.5, colW, ROW_H - 1, 1, 1, "S");

    // Gold bullet
    const bulletX = x + 4;
    const bulletY = y - 1.5;
    setFill(doc, C.gold);
    doc.circle(bulletX, bulletY, 1.2, "F");

    // Item number
    setTextColor(doc, C.darkBrown);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.text(`${i + 1}.`, bulletX + 3, y - 0.8);

    // Item text
    setTextColor(doc, C.textDark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    const maxW = colW - 16;
    const lines = doc.splitTextToSize(item, maxW);
    doc.text(lines[0], bulletX + 8, y - 0.8);
  });

  curY += itemsPerCol * ROW_H + 6;

  // ── 9. Note / inclusion strip ───────────────────────────────────────────────
  drawDivider(doc, MARGIN + 6, curY, IW - 12);
  drawDiamond(doc, PW / 2, curY + 1);
  curY += 10;

  setFill(doc, C.darkBrown);
  doc.roundedRect(MARGIN + 4, curY, IW - 8, 14, 1, 1, "F");

  setTextColor(doc, C.gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  // Replace ✦ with ASCII star — emoji/special chars cause blank glyphs in jsPDF
  doc.text("*  INCLUSIVE NOTE  *", PW / 2, curY + 5.5, { align: "center" });

  setTextColor(doc, C.creamDark);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text(data.note, PW / 2, curY + 11, { align: "center" });

  curY += 22;

  // ── 10. Package type badge (Veg / Non-Veg) ────────────────────────────────
  const isVeg = data.packageType === "veg";
  const badgeColor: [number, number, number] = isVeg ? C.green : C.red;
  // Wider badge (44 mm) so "NON-VEGETARIAN" text fits; replace emoji with plain prefix
  const vegBadgeW = 44;
  setFill(doc, badgeColor);
  doc.roundedRect(PW / 2 - vegBadgeW / 2, curY, vegBadgeW, 8, 2, 2, "F");
  setTextColor(doc, C.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text(
    isVeg ? "[VEG]  VEGETARIAN" : "[NON-VEG]  NON-VEGETARIAN",
    PW / 2, curY + 5.5, { align: "center" }
  );

  curY += 14;

  // ── 11. All 3 packages quick-reference strip ───────────────────────────────
  drawDivider(doc, MARGIN + 6, curY, IW - 12);
  curY += 6;

  setTextColor(doc, C.textMid);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("OTHER PACKAGES AT A GLANCE", PW / 2, curY, { align: "center" });
  curY += 5;

  const packages = [
    { name: "Wedding Feast (Non-Veg)", mutton: "Rs.500/plate", chicken: "Rs.400/plate" },
    { name: "Hotel Supply (Non-Veg)", mutton: "Rs.450/plate", chicken: "Rs.350/plate" },
    { name: "Hotel Supply (Veg)", price: "Rs.300/plate" },
  ];

  const pkgW = (IW - 8) / 3;
  packages.forEach((pkg, i) => {
    const px = MARGIN + 4 + i * (pkgW + 2);
    setFill(doc, i === 2 ? [230, 245, 235] as [number,number,number] : [255, 245, 230] as [number,number,number]);
    doc.roundedRect(px, curY, pkgW, 18, 1, 1, "F");
    setDraw(doc, C.gold);
    doc.setLineWidth(0.3);
    doc.roundedRect(px, curY, pkgW, 18, 1, 1, "S");

    setTextColor(doc, C.darkBrown);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    const nameLines = doc.splitTextToSize(pkg.name, pkgW - 4);
    doc.text(nameLines, px + pkgW / 2, curY + 5, { align: "center" });

    setTextColor(doc, C.textMid);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    if (pkg.price) {
      doc.text(pkg.price, px + pkgW / 2, curY + 14, { align: "center" });
    } else {
      doc.text(`Mutton: ${pkg.mutton}`, px + pkgW / 2, curY + 11.5, { align: "center" });
      doc.text(`Chicken: ${pkg.chicken}`, px + pkgW / 2, curY + 16.5, { align: "center" });
    }
  });

  curY += 24;

  // ── 12. Footer ─────────────────────────────────────────────────────────────
  setFill(doc, C.darkBrown);
  doc.rect(0, PH - 18, PW, 18, "F");
  setFill(doc, C.gold);
  doc.rect(0, PH - 18, PW, 1.5, "F");

  setTextColor(doc, C.gold);
  doc.setFont("times", "bolditalic");
  doc.setFontSize(9);
  doc.text("Rebekha Caterers", PW / 2, PH - 11, { align: "center" });

  setTextColor(doc, C.creamDark);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.text(
    "#19, Perumal Koil Street, Irumbuliyur, Tambaram (W), Chennai - 600 045  |  rebekhacaterers.online",
    PW / 2, PH - 5.5, { align: "center" }
  );

  // ── 13. Save ────────────────────────────────────────────────────────────────
  const safeName = data.title.replace(/[^a-zA-Z0-9]/g, "_");
  doc.save(`Rebekha_Caterers_${safeName}_Menu.pdf`);
}
