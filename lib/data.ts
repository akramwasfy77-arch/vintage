export const ADMIN_EMAIL = 'akramwasfy77@gmail.com';
export const VODAFONE_CASH = '01029397797';

export type Pkg = { id: string; name: string; price: number; days: number; perks: string[]; badge?: string };

export const PACKAGES: Pkg[] = [
  { id: 'basic', name: 'إعلان عادي', price: 15, days: 15, perks: ['ظهور في القسم', 'حتى 10 صور', 'تواصل واتساب مباشر'] },
  { id: 'special', name: 'إعلان مميز', price: 35, days: 30, perks: ['إطار ذهبي مميّز', 'أولوية في الترتيب', 'مدة 30 يوم'], badge: 'الأكثر طلباً' },
  { id: 'featured', name: 'إعلان Featured', price: 75, days: 15, perks: ['أعلى نتائج القسم', 'شارة Featured', 'ظهور في الرئيسية'] },
  { id: 'premium', name: 'إعلان Premium', price: 150, days: 30, perks: ['بانر في الصفحة الرئيسية', 'أعلى الترتيب دائماً', 'مدة 30 يوم'] },
];

export const CATEGORIES: { slug: string; name: string; icon: string; subs: string[] }[] = [
  { slug: 'antiques', name: 'التحف والأنتيك', icon: '🏺', subs: ['أنتيك فرنسي', 'أنتيك عثماني', 'أنتيك مصري', 'تماثيل', 'مزهريات'] },
  { slug: 'art-decor', name: 'الفنون والديكور', icon: '🖼️', subs: ['لوحات', 'سيراميك', 'نجف', 'مرايا', 'سجاد شرقي'] },
  { slug: 'watches-jewelry', name: 'الساعات والمجوهرات', icon: '⌚', subs: ['ساعات كلاسيكية', 'مجوهرات عتيقة', 'فضيات'] },
  { slug: 'books-docs', name: 'الكتب والوثائق', icon: '📜', subs: ['كتب نادرة', 'مخطوطات', 'عملات', 'طوابع'] },
  { slug: 'classic-furniture', name: 'الأثاث الكلاسيكي', icon: '🪑', subs: ['لويس', 'طرابيزات', 'كراسي', 'مكتبات قديمة'] },
  { slug: 'vintage-electronics', name: 'الإلكترونيات الكلاسيكية', icon: '📻', subs: ['راديوهات', 'جراموفون', 'كاميرات'] },
  { slug: 'rare-collectibles', name: 'المقتنيات النادرة', icon: '🎖️', subs: ['ألعاب', 'مذكرات', 'أعلام رياضية', 'تذاكر'] },
  { slug: 'used-misc', name: 'متنوعات مستعملة', icon: '👜', subs: ['حقائب فينتاج', 'ملابس كلاسيكية'] },
];

export const GOVERNORATES = ['القاهرة','الجيزة','الإسكندرية','القليوبية','الدقهلية','الشرقية','الغربية','المنوفية','البحيرة','كفر الشيخ','دمياط','بورسعيد','الإسماعيلية','السويس','الفيوم','بني سويف','المنيا','أسيوط','سوهاج','قنا','الأقصر','أسوان','البحر الأحمر','مطروح','شمال سيناء','جنوب سيناء','الوادي الجديد'];

export const catName = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.name || slug;
export const pkgById = (id: string) => PACKAGES.find((p) => p.id === id);
export const egp = (n: number) => new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 }).format(Number(n || 0)) + ' جنيه';
export const waLink = (phone: string, title: string) => {
  const p = (phone || '').replace(/\D/g, '').replace(/^0/, '20');
  return `https://wa.me/${p}?text=${encodeURIComponent(`مرحباً، مهتم بإعلان "${title}" على كراكيب وتحف`)}`;
};
