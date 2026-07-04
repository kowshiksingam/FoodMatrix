/* ============================================================
   Food Matrix – Core Application Controller (SPA)
   Manages client-side routing, state, and dynamic rendering.
   ============================================================ */

const CART_KEY = 'food_munch_cart';
const USER_KEY = 'food_munch_user';
const LOC_KEY = 'food_munch_location';

// ── Complete Menu Database ─────────────────────────────────
const MENU_DATA = {
  "vegstart": [
    { "name": "Spring Rolls", "img": "https://media.istockphoto.com/id/840599504/photo/spring-rolls.jpg?s=612x612&w=0&k=20&c=wByMigy56ioHSR7QzXFNNAbgiso8xlAqPfAD35A6YGA=", "rating": 4.6, "price": 140 },
    { "name": "Panner Tikka", "img": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80", "rating": 4.8, "price": 130 },
    { "name": "Cheese Kabab", "img": "https://t4.ftcdn.net/jpg/03/95/56/41/360_F_395564102_49ZuUSjCKpIu2F1IRcuDQPzWhhrnP63J.jpg", "rating": 4.6, "price": 150 },
    { "name": "Gobi Tandoori", "img": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80", "rating": 4.5, "price": 100 },
    { "name": "Mushroom", "img": "https://tandooriflamesmelbourne.com.au/wp-content/uploads/2019/02/Tandoori-Mushroom.jpg", "rating": 4.8, "price": 180 },
    { "name": "Kabab", "img": "https://t4.ftcdn.net/jpg/02/57/02/67/360_F_257026750_ckdlvzplvocnCn8aGQhdD8tZ430O4hgX.jpg", "rating": 4.9, "price": 120 },
    { "name": "Manchhurian", "img": "https://media.istockphoto.com/id/1208081427/photo/veg-manchurian-very-popular-chinese-snack-popular-in-india.jpg?s=612x612&w=0&k=20&c=C_Lsxts8SAyGTaMwiAx_S2PEaRzM0V1r93S6FeysW8I=", "rating": 4.6, "price": 100 },
    { "name": "Panner 65", "img": "https://t4.ftcdn.net/jpg/09/03/57/99/240_F_903579983_OCnIqwcnbOC8ytTg6kzj8RiNAO0ewlRY.jpg", "rating": 4.3, "price": 130 }
  ],
  "nonvegstart": [
    { "name": "Chicken-65", "img": "https://thumbs.dreamstime.com/b/chicken-chinese-cuisine-s-deep-fried-course-crazy-saltiness-crunchiness-to-punchy-flavours-curry-leaves-ginger-195902298.jpg", "rating": 4.9, "price": 240 },
    { "name": "Chilli Chicken", "img": "https://www.shutterstock.com/image-photo/chilli-chicken-dry-popular-indochinese-600nw-2094546748.jpg", "rating": 4.6, "price": 230 },
    { "name": "Apolo Fish", "img": "https://i.ytimg.com/vi/scpY5FKM8b8/maxresdefault.jpg", "rating": 4.9, "price": 300 },
    { "name": "Spring Rolls", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvhcQ5Xi3-d0cqKNI2GYBjjptbXlJ9pft_vg&s", "rating": 4.5, "price": 150 },
    { "name": "Manchurian", "img": "https://media.istockphoto.com/id/1333972938/photo/cabbage-manchurian.jpg?s=612x612&w=0&k=20&c=oGPATDCUY7-THeDpCHqcf4SmRVdJ8wKk2y61NxvXXKM=", "rating": 4.8, "price": 130 },
    { "name": "KFC", "img": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80", "rating": 4.9, "price": 190 },
    { "name": "Chilli Prawns", "img": "https://media.istockphoto.com/id/1407544739/photo/roasted-shrimp-with-chili-and-salt.jpg?s=612x612&w=0&k=20&c=wcQZUGl1BQPEzVV_8nqmvTUeRaeSdpBxOZYsuFf0ReI=", "rating": 4.8, "price": 280 },
    { "name": "Chicken Lolipop", "img": "https://t3.ftcdn.ftcdn.net/jpg/03/74/12/30/360_F_374123015_5NXgf5TJshJSZJGu4DewFJveeyzsmkui.jpg", "rating": 4.9, "price": 200 }
  ],
  "biryani": [
    { "name": "Mutton Biryani", "img": "https://as1.ftcdn.net/jpg/08/88/59/62/1000_F_888596228_FKsyM4Xc2raXs5lCR3SHhW6Xs6AT1DgE.jpg", "rating": 4.9, "price": 300 },
    { "name": "Chicken Biryani", "img": "https://as2.ftcdn.net/jpg/13/14/47/45/1000_F_1314474517_L75hPsnffsOEHhvkV19nQM5Xwfl9OKrj.jpg", "rating": 4.8, "price": 150 },
    { "name": "Fry Biryani", "img": "https://as2.ftcdn.net/jpg/13/50/10/19/1000_F_1350101985_dfwKTcS11SOBp7iBpYrtrVupHqSnpAzf.jpg", "rating": 4.3, "price": 200 },
    { "name": "Veg Biryani", "img": "https://as2.ftcdn.net/jpg/07/17/85/21/1000_F_717852126_3SR8z9AbelCo2qPv8eAzh7iYQGSpd2r4.jpg", "rating": 4.5, "price": 180 },
    { "name": "Fish Biryani", "img": "https://as1.ftcdn.net/jpg/04/18/22/50/1000_F_418225097_7iVmIAdPvgrywca5C1f9Ye26S2uNyO9w.jpg", "rating": 4.9, "price": 280 },
    { "name": "Prawns Biryani", "img": "https://as1.ftcdn.net/jpg/10/51/73/72/1000_F_1051737210_Xr4E3MConitc3Rn8CSXkrGGCDlsPGra0.jpg", "rating": 4.8, "price": 280 },
    { "name": "Egg Biryani", "img": "https://as1.ftcdn.net/jpg/13/91/53/90/1000_F_1391539014_jWqNZxmh5rjRZPnHUIVZ9oioU8yLNXiR.jpg", "rating": 4.4, "price": 120 },
    { "name": "Gobi Biryani", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpIhb5-HTS9i_7GB-KB10aVruRETCuXdpPHw&s", "rating": 4.9, "price": 100 }
  ],
  "noodles": [
    { "name": "Chi-Noodles", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOgvRSQ2AZ-vxnuT1SSkeJAk1cInBh83Dpug&s", "rating": 4.9, "price": 140 },
    { "name": "Veg-Noodles", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw_4tspm6IY98sZwjlSG8RjlAfdha_UDLQdA&s", "rating": 4.6, "price": 130 },
    { "name": "Chow mein", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbCqi5ExR9l6mfVFu-GeEcfJf9Y9e0YX9gA&s", "rating": 4.9, "price": 150 },
    { "name": "Hakka Noodles", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDKCarlgv5sEQPT5N4AmFsirVdPqL7iDYIng&s", "rating": 4.5, "price": 150 },
    { "name": "Egg Noodles", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhSlX-d3Xc0ptJdl1V6AEoetO6jWsOUu_H1A&s", "rating": 4.8, "price": 130 },
    { "name": "Shezwan", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjBz4dMLLXCadV3RU08oQsUNC3GZdYn2qdbA&s", "rating": 4.9, "price": 180 },
    { "name": "Mix Noodles", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6OxResXITN4ZM-QV7F7B-xbumZ9CUYoMt2Q&s", "rating": 4.8, "price": 180 },
    { "name": "Garlic Noodles", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mJeH96uAGGKy-VhjbYiZzhS4TA290Nt-rQ&s", "rating": 4.9, "price": 200 }
  ],
  "soup": [
    { "name": "Corn Soup", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNw5vsWBLAuTfC_xDSoa29a4e1jzv3ADdwgg&s", "rating": 4.6, "price": 150 },
    { "name": "Chicken soup", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdGZM0-EwBcU9sFr1h8bUbaUQ3mogXTHKrqg&s", "rating": 4.8, "price": 180 },
    { "name": "Tomato Soup", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYbmd5Nubu-VB6OoVRWwUOq_fuG3L1oAzzRw&s", "rating": 4.7, "price": 140 },
    { "name": "Mutton Soup", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiVhJoANCpsyBuOCtVuJ8vCXVKI1Ff7C-tTQ&s", "rating": 4.9, "price": 170 },
    { "name": "Hot Soup", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSkhNm2qYFdXLsatoIn0W_FQ2Ld8iKaI-WGw&s", "rating": 4.6, "price": 130 },
    { "name": "Garden Soup", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTYzd5oYCxXdHeUq0IXI2affa9n77FP7rdZw&s", "rating": 4.5, "price": 120 },
    { "name": "Crab Soup", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgAozgNXEaVhfTRq4P9ytfRz2hxSn822ESHw&s", "rating": 4.8, "price": 160 },
    { "name": "Peanut Soup", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmK1WXWFDGdhXoatvg7-O7B8zHX52qk4PfOA&s", "rating": 4.6, "price": 150 }
  ],
  "salad": [
    { "name": "Caesar Salad", "img": "https://t3.ftcdn.net/jpg/03/89/33/70/240_F_389337028_wX7vudCV0pjpN1dVdhewW3jmfrOiqjMd.jpg", "rating": 4.8, "price": 120 },
    { "name": "Pasta Salad", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpQmopN93wRRuRVj7ZwnRBkFPpFjD8bfv3ZQ&s", "rating": 4.9, "price": 180 },
    { "name": "Chicken Salad", "img": "https://t3.ftcdn.net/jpg/04/08/01/18/240_F_408011889_RraNeo3X0at69JbQZQx4JKLMw3PyENlW.jpg", "rating": 4.8, "price": 190 },
    { "name": "Chef salad", "img": "https://t4.ftcdn.net/jpg/05/22/52/29/240_F_522522914_ZEzTTPG3xu8wYc0xlDyjd4h8g4cisAkf.jpg", "rating": 4.9, "price": 120 },
    { "name": "Veggie Salad", "img": "https://t3.ftcdn.net/jpg/10/39/34/46/240_F_1039344660_PrpSLG9nFkpCfulLrKrAiH5mmKCTedMB.jpg", "rating": 4.4, "price": 100 },
    { "name": "Greek Salad", "img": "https://t3.ftcdn.net/jpg/13/16/12/36/240_F_1316123652_8EtLlTux34ENAcqj3SOQpgtT6yN8G922.jpg", "rating": 4.9, "price": 130 },
    { "name": "Crab Salad", "img": "https://t4.ftcdn.net/jpg/00/65/69/53/240_F_65695395_bNVSPXBsUjAJrpBqwD5xjGlxncOwKQwl.jpg", "rating": 4.3, "price": 180 },
    { "name": "Fruit Salad", "img": "https://t3.ftcdn.net/jpg/01/62/46/22/240_F_162462284_rmr3e5bZdvTkyLd0Bpy9xHWtQer2I2l0.jpg", "rating": 4.8, "price": 130 }
  ],
  "fish": [
    { "name": "Prawns pakoda", "img": "https://img-global.cpcdn.com/recipes/2bc990b35f82f2ef/680x482cq70/prawn-pakoda-recipe-main-photo.jpg", "rating": 4.8, "price": 180 },
    { "name": "Crab Fry", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQ4u9sdd6bjznPWbylsHGpX4l6ZFCpukZdQ&s", "rating": 4.6, "price": 190 },
    { "name": "Chilli Fish", "img": "https://www.shutterstock.com/image-photo/fish-manchurian-dry-looks-like-600nw-1606841674.jpg", "rating": 4.4, "price": 130 },
    { "name": "Fish finger", "img": "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80", "rating": 4.4, "price": 160 },
    { "name": "Prawns Curry", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrb-dTVc9f508XmbQz1NE40u98NJ6HtbuDGw&s", "rating": 4.8, "price": 200 },
    { "name": "Fish Curry", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdvOPO-7bJ4Eh5Vcx02Q92WGyFj61S5x-bA&s", "rating": 4.4, "price": 230 },
    { "name": "Fish Fry", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-XZTEKyIKMQbejDd2OSFkyHTKndBlK2ZhQ&s", "rating": 4.6, "price": 240 },
    { "name": "Fish Pakoda", "img": "https://thumbs.dreamstime.com/b/indian-cuisine-amritsari-fish-pakoda-famous-snack-296501875.jpg", "rating": 4.8, "price": 100 }
  ],
  "desert": [
    { "name": "Blue Heaven", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-CU4lDlr_iFh8OfOphtGyLK4yGuI-1tkp0Q&s", "rating": 4.8, "price": 100 },
    { "name": "Borboun Ice", "img": "https://assets.ccbp.in/frontend/responsive-website/em-coffee-bourbon-img.png", "rating": 4.6, "price": 120 },
    { "name": "Blue Moon", "img": "https://www.shutterstock.com/image-photo/blue-moon-drink-lychee-fresh-600nw-1800670609.jpg", "rating": 4.8, "price": 100 },
    { "name": "Choclate Shake", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLkp_XYt-ZCSZW4ADmTZEjcjPiAfCIVTptA&s", "rating": 4.9, "price": 150 },
    { "name": "Oreo Shake", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS90_sNhyye7wW-VI8VBnqG5x4PANz-QeTkmg&s", "rating": 4.9, "price": 120 },
    { "name": "Banana Shake", "img": "https://media.istockphoto.com/id/1194152250/photo/vegan-banana-and-oatmeal-smoothie-in-glass-jar-on-the-light-background.jpg?s=612x612&w=0&k=20&c=np9DgHLFcUJwY5hzLd3aSLzebaYDzPzerkEGbuGy0tY=", "rating": 4.6, "price": 120 },
    { "name": "Lemon Bars", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpnALUVtFBlIAfOn5hQmpe4-1n2KSgq4t5EQ&s", "rating": 4.8, "price": 100 },
    { "name": "Black Forest", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEMJQD-uU_uIUk7jnAu9nh_ppR9czukwUaA&s", "rating": 4.6, "price": 100 }
  ]
};

const CATEGORIES = {
  "vegstart": { title: "Veg Starters", desc: "Crispy, fresh, and perfectly seasoned vegetarian appetizers.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80" },
  "nonvegstart": { title: "Non-Veg Starters", desc: "Sizzling meat and seafood starters packed with bold, robust flavors.", img: "https://thumbs.dreamstime.com/b/chicken-chinese-cuisine-s-deep-fried-course-crazy-saltiness-crunchiness-to-punchy-flavours-curry-leaves-ginger-195902298.jpg" },
  "biryani": { title: "Biryani & Rice", desc: "Fragrant long-grain basmati cooked with secret spices and tender ingredients.", img: "https://as2.ftcdn.net/jpg/13/14/47/45/1000_F_1314474517_L75hPsnffsOEHhvkV19nQM5Xwfl9OKrj.jpg" },
  "noodles": { title: "Noodles & Pasta", desc: "Pan-fried noodles tossed with fresh vegetables and gourmet sauces.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOgvRSQ2AZ-vxnuT1SSkeJAk1cInBh83Dpug&s" },
  "soup": { title: "Soups & Broths", desc: "Warm, comforting, and nutrient-rich bowls to enrich your palate.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNw5vsWBLAuTfC_xDSoa29a4e1jzv3ADdwgg&s" },
  "salad": { title: "Salads & Greens", desc: "Chilled fresh greens, premium dressings, and light, healthy pairings.", img: "https://t3.ftcdn.net/jpg/03/89/33/70/240_F_389337028_wX7vudCV0pjpN1dVdhewW3jmfrOiqjMd.jpg" },
  "fish": { title: "Seafood Specials", desc: "Coastal catches fried, curried, or grilled to ocean-fresh perfection.", img: "https://img-global.cpcdn.com/recipes/2bc990b35f82f2ef/680x482cq70/prawn-pakoda-recipe-main-photo.jpg" },
  "desert": { title: "Desserts & Sweets", desc: "Decadent cakes, thick gourmet milkshakes, and sweet chilled desserts.", img: "https://assets.ccbp.in/frontend/responsive-website/em-coffee-bourbon-img.png" }
};

// ── Application State ──────────────────────────────────────
const STATE = {
  cart: loadCart(),
  user: loadUser(),
  location: loadLocation() || 'Hyderabad, India',
  searchQuery: '',
  promo: loadPromo()
};

// ── Local Storage Helpers ──────────────────────────────────
function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch(e) { return []; }
}
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(STATE.cart));
}
function loadUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; } catch(e) { return null; }
}
function saveUser() {
  localStorage.setItem(USER_KEY, JSON.stringify(STATE.user));
}
function loadLocation() {
  return localStorage.getItem(LOC_KEY);
}
function saveLocation(loc) {
  STATE.location = loc;
  localStorage.setItem(LOC_KEY, loc);
}
function loadPromo() {
  try { return JSON.parse(localStorage.getItem('fm_promo')) || null; } catch(e) { return null; }
}
function savePromo(promo) {
  STATE.promo = promo;
  if (promo) localStorage.setItem('fm_promo', JSON.stringify(promo));
  else localStorage.removeItem('fm_promo');
}

// ── Global Toast Center ─────────────────────────────────────
function showToast(message, icon = 'fa-check') {
  const container = document.getElementById('global-toast-center');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideDownFade 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ── Shared Cart Actions ────────────────────────────────────
function addToCart(name, price, img) {
  const existing = STATE.cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    STATE.cart.push({ name, price, qty: 1, img });
  }
  saveCart();
  syncHeaderState();
  showToast(`Added <b>${name}</b> to your cart!`);
}

function updateCartQty(name, delta) {
  const item = STATE.cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    STATE.cart = STATE.cart.filter(i => i.name !== name);
    showToast(`Removed <b>${name}</b> from cart`, 'fa-trash-can');
  }
  saveCart();
  syncHeaderState();
  
  // If we are currently rendering the cart, re-render it
  if (window.location.hash === '#cart') {
    renderView();
  }
}

function removeCartItem(name) {
  STATE.cart = STATE.cart.filter(i => i.name !== name);
  saveCart();
  syncHeaderState();
  showToast(`Removed <b>${name}</b>`, 'fa-trash-can');
  if (window.location.hash === '#cart') {
    renderView();
  }
}

// ── Header State Sync ──────────────────────────────────────
function syncHeaderState() {
  // Cart badge
  const badge = document.getElementById('nav-cart-badge');
  const count = STATE.cart.reduce((s, i) => s + i.qty, 0);
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  // Address text
  const addr = document.getElementById('selected-address');
  if (addr) {
    addr.textContent = STATE.location;
  }

  // User auth status
  const authZone = document.getElementById('user-auth-zone');
  if (authZone) {
    if (STATE.user) {
      const initial = STATE.user.phone ? STATE.user.phone.substring(0, 2) : 'U';
      authZone.innerHTML = `
        <div class="user-profile-badge" id="user-profile-toggle">
          <div class="user-avatar">${initial}</div>
          <span style="font-size:13px;font-weight:600;color:var(--text-main);">Verified User</span>
          <button id="logout-btn" style="background:none;border:none;color:var(--error);font-size:12px;font-weight:700;cursor:pointer;margin-left:4px;">Logout</button>
        </div>
      `;
      // Wire up logout
      document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        STATE.user = null;
        saveUser();
        syncHeaderState();
        showToast('Logged out successfully', 'fa-right-from-bracket');
        window.location.hash = '#home';
      });
    } else {
      authZone.innerHTML = `
        <a href="#sign-in" class="login-btn">
          <i class="fa-solid fa-user-lock"></i>
          <span>Sign In</span>
        </a>
      `;
    }
  }
}

// ── Global Search and Filter logic ──────────────────────────
function handleGlobalSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  STATE.searchQuery = query;
  
  const hash = window.location.hash;
  if (hash.startsWith('#category/')) {
    // If on category page, filter items in DOM
    const cards = document.querySelectorAll('.food-card');
    cards.forEach(card => {
      const title = card.querySelector('.food-title').textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  } else {
    // If on home/other pages, render a search results view
    if (query.length > 0) {
      renderSearchResults(query);
    } else if (hash === '' || hash === '#home') {
      // Revert search view to normal home view
      renderHome();
    }
  }
}

// ── Views Renderers ────────────────────────────────────────

// 1. Home View
function renderHome() {
  const root = document.getElementById('app-root');
  if (!root) return;

  let categoriesHTML = '';
  Object.keys(CATEGORIES).forEach(key => {
    const cat = CATEGORIES[key];
    categoriesHTML += `
      <div class="category-card" onclick="window.location.hash='#category/${key}'">
        <img src="${cat.img}" class="category-bg-img" alt="${cat.title}" onerror="this.src='https://assets.ccbp.in/frontend/responsive-website/food-serve.png'">
        <div class="category-overlay">
          <h3>${cat.title}</h3>
          <span class="category-link">View Dishes <i class="fa-solid fa-arrow-right-long"></i></span>
        </div>
      </div>
    `;
  });

  root.innerHTML = `
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-content">
        <span class="hero-subtitle">Gourmet & Fresh</span>
        <h1 class="hero-title">Experience Premium Dining At Home</h1>
        <p class="hero-para">Handcrafted recipes prepared by world-class chefs, delivered hot and fresh directly to your door.</p>
        <div class="hero-cta">
          <button class="btn-primary" onclick="window.location.hash='#category/biryani'">Order Now</button>
          <button class="btn-secondary" onclick="document.getElementById('explore-menu-title').scrollIntoView()">Explore Menu</button>
        </div>
      </div>
      <div class="hero-image-wrapper">
        <img src="https://assets.ccbp.in/frontend/responsive-website/foodmunch-banner-bg.png" class="hero-img" alt="Gourmet Food Display">
      </div>
    </section>

    <!-- Why Choose Us Cards -->
    <section class="why-choose-us">
      <div class="section-header">
        <h2>Why Food Matrix?</h2>
        <p>We combine exquisite ingredients, top safety standards, and lightning-fast logistics.</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-box"><i class="fa-solid fa-shield-halved"></i></div>
          <h3>Food Hygiene</h3>
          <p>Double-sealed delivery packs with strict daily temperature checks for kitchen staff.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-box"><i class="fa-solid fa-truck-fast"></i></div>
          <h3>10-Min Delivery</h3>
          <p>Sourced from local hubs to ensure you receive meals steaming hot and in record time.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-box"><i class="fa-solid fa-tags"></i></div>
          <h3>Best Offers</h3>
          <p>Earn loyalty points on every order, with flat discounts available all year round.</p>
        </div>
      </div>
    </section>

    <!-- Explore Menu -->
    <section class="menu-categories-section">
      <div class="section-header" id="explore-menu-title">
        <h2>Explore Our Menu</h2>
        <p>Choose from our rich array of local favorites, starters, and continental desserts.</p>
      </div>
      <div class="categories-grid">
        ${categoriesHTML}
      </div>
    </section>

    <!-- Split Banner: Healthy Food -->
    <section class="split-banner">
      <div class="banner-img-wrapper">
        <img src="https://assets.ccbp.in/frontend/responsive-website/foodmunch-healthy-food-img.png" alt="Healthy Meals">
      </div>
      <div class="banner-content">
        <h2>Fresh, Healthy, Organic</h2>
        <p>We source all vegetables and poultry from certified organic local farms. Low sodium, zero artificial preservatives, and gluten-free choices are available on demand.</p>
        <button class="btn-primary" onclick="window.location.hash='#category/salad'">Healthy Salads</button>
      </div>
    </section>

    <!-- Split Banner: Payments -->
    <section class="split-banner reverse">
      <div class="banner-content">
        <h2>Safe Payments & Cashless Checkout</h2>
        <p>Complete your orders securely. We support secure UPI transactions, major cards, wallet options, and secure Cash on Delivery.</p>
        <div class="payment-icons" style="font-size: 32px; color: var(--text-main); margin-bottom: 20px;">
          <i class="fa-brands fa-cc-visa"></i>
          <i class="fa-brands fa-cc-mastercard"></i>
          <i class="fa-solid fa-money-bill-transfer"></i>
        </div>
        <button class="btn-primary" onclick="window.location.hash='#category/desert'">Order Desserts</button>
      </div>
      <div class="banner-img-wrapper">
        <img src="https://assets.ccbp.in/frontend/responsive-website/foodmunch-delivery-payment-img.png" alt="Payment & Delivery">
      </div>
    </section>
  `;
}

// 2. Category View
function renderCategory(categoryId) {
  const root = document.getElementById('app-root');
  if (!root) return;

  const category = CATEGORIES[categoryId];
  const items = MENU_DATA[categoryId];

  if (!category || !items) {
    root.innerHTML = `<div style="text-align:center;padding:100px 20px;"><h2>Category not found</h2><a href="#home">Back to Home</a></div>`;
    return;
  }

  let itemsHTML = '';
  items.forEach(item => {
    itemsHTML += `
      <div class="food-card">
        <div class="food-img-box">
          <img src="${item.img}" class="food-card-img" alt="${item.name}" onerror="this.src='https://assets.ccbp.in/frontend/responsive-website/food-serve.png'">
          <span class="rating-tag"><i class="fa-solid fa-star"></i> ${item.rating}</span>
        </div>
        <div class="food-info">
          <h3 class="food-title">${item.name}</h3>
          <p class="food-price">₹${item.price}</p>
          <button onclick="addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price}, '${item.img}')">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
  });

  root.innerHTML = `
    <div class="category-header">
      <h1>${category.title}</h1>
      <p>${category.desc}</p>
    </div>
    <div class="items-grid">
      ${itemsHTML}
    </div>
  `;

  // Re-apply filter if search box has existing text
  if (STATE.searchQuery) {
    const input = document.getElementById('global-search-input');
    if (input) input.value = STATE.searchQuery;
    handleGlobalSearch({ target: { value: STATE.searchQuery } });
  }
}

// 3. Search Results View
function renderSearchResults(query) {
  const root = document.getElementById('app-root');
  if (!root) return;

  let matches = [];
  Object.keys(MENU_DATA).forEach(catId => {
    MENU_DATA[catId].forEach(item => {
      if (item.name.toLowerCase().includes(query)) {
        matches.push({ ...item, categoryId: catId });
      }
    });
  });

  let itemsHTML = '';
  if (matches.length > 0) {
    matches.forEach(item => {
      itemsHTML += `
        <div class="food-card">
          <div class="food-img-box">
            <img src="${item.img}" class="food-card-img" alt="${item.name}" onerror="this.src='https://assets.ccbp.in/frontend/responsive-website/food-serve.png'">
            <span class="rating-tag"><i class="fa-solid fa-star"></i> ${item.rating}</span>
          </div>
          <div class="food-info">
            <h3 class="food-title">${item.name}</h3>
            <p style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing:0.5px; margin-top:-4px;">in ${CATEGORIES[item.categoryId].title}</p>
            <p class="food-price">₹${item.price}</p>
            <button onclick="addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price}, '${item.img}')">
              <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      `;
    });
  } else {
    itemsHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:var(--text-muted);">
      <i class="fa-solid fa-face-sad-tear" style="font-size: 48px; margin-bottom:12px;"></i>
      <p>No dishes found matching "${query}"</p>
    </div>`;
  }

  root.innerHTML = `
    <div class="category-header">
      <h1>Search Results</h1>
      <p>Showing matching delicacies for "${query}"</p>
    </div>
    <div class="items-grid">
      ${itemsHTML}
    </div>
  `;
}

// 4. Cart View
function renderCart() {
  const root = document.getElementById('app-root');
  if (!root) return;

  if (STATE.cart.length === 0) {
    root.innerHTML = `
      <h2 class="cart-title">Your Cart</h2>
      <div class="empty-cart-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <h3>Your basket is empty</h3>
        <p>Explore our menu categories and add delicious dishes to satisfy your cravings.</p>
        <button class="btn-primary" onclick="window.location.hash='#home'" style="width:200px;margin-top:10px;">Explore Menu</button>
      </div>
    `;
    return;
  }

  let itemsHTML = '';
  STATE.cart.forEach(item => {
    const subtotal = item.price * item.qty;
    itemsHTML += `
      <div class="cart-card-item">
        <img src="${item.img}" class="cart-item-thumbnail" alt="${item.name}" onerror="this.src='https://assets.ccbp.in/frontend/responsive-website/food-serve.png'">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <p class="cart-item-unit-price">₹${item.price} each</p>
          <p class="cart-item-subtotal">₹${subtotal}</p>
        </div>
        <div class="cart-qty-widget">
          <button class="cart-qty-btn" onclick="updateCartQty('${item.name.replace(/'/g, "\\'")}', -1)">−</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="cart-qty-btn" onclick="updateCartQty('${item.name.replace(/'/g, "\\'")}', 1)">+</button>
        </div>
        <button class="cart-item-delete" onclick="removeCartItem('${item.name.replace(/'/g, "\\'")}')">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;
  });

  const cartSubtotal = STATE.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = cartSubtotal > 499 ? 0 : 40;
  
  let discountAmount = 0;
  if (STATE.promo) {
    discountAmount = Math.round(cartSubtotal * (STATE.promo.discount / 100));
  }
  
  const finalTotal = cartSubtotal + deliveryFee - discountAmount;

  root.innerHTML = `
    <h2 class="cart-title">Your Basket</h2>
    <div class="cart-layout">
      <!-- Items column -->
      <div class="cart-items-column">
        ${itemsHTML}
      </div>

      <!-- Checkout Summary Column -->
      <div class="summary-card">
        <h3 class="summary-title">Bill Details</h3>
        
        <!-- Promo box -->
        <div class="promo-form">
          <input type="text" id="promo-code-input" placeholder="Promo Code (FOOD10, MUNCH20)" value="${STATE.promo ? STATE.promo.code : ''}">
          <button onclick="applyPromoCode()">Apply</button>
        </div>
        ${STATE.promo ? `<div style="font-size:12px;color:var(--success);font-weight:600;margin-top:-14px;margin-bottom:14px;"><i class="fa-solid fa-circle-check"></i> Code ${STATE.promo.code} applied! (${STATE.promo.discount}% Off)</div>` : ''}

        <div class="summary-row">
          <span>Subtotal</span>
          <span>₹${cartSubtotal}</span>
        </div>
        <div class="summary-row">
          <span>Delivery Charge</span>
          <span>${deliveryFee === 0 ? '<span style="color:var(--success);font-weight:700;">FREE</span>' : '₹' + deliveryFee}</span>
        </div>
        ${deliveryFee > 0 ? `<div style="font-size:11px;color:var(--text-muted);margin-top:-8px;margin-bottom:8px;">Add ₹${500 - cartSubtotal} more for FREE delivery!</div>` : ''}
        
        ${STATE.promo ? `
        <div class="summary-row" style="color:var(--success);font-weight:600;">
          <span>Discount (${STATE.promo.discount}%)</span>
          <span>- ₹${discountAmount}</span>
        </div>` : ''}

        <div class="summary-row total">
          <span>To Pay</span>
          <span>₹${finalTotal}</span>
        </div>

        <button class="checkout-action-btn" onclick="proceedToCheckout()">
          Proceed to Order <i class="fa-solid fa-arrow-right-long"></i>
        </button>
        <button class="continue-shopping-btn" onclick="window.location.hash='#home'">
          Add More Items
        </button>
      </div>
    </div>
  `;
}

function applyPromoCode() {
  const input = document.getElementById('promo-code-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  const validCodes = {
    'FOOD10': 10,
    'MUNCH20': 20
  };

  if (validCodes[code]) {
    savePromo({ code, discount: validCodes[code] });
    showToast(`Promo <b>${code}</b> applied successfully!`, 'fa-circle-check');
    renderCart();
  } else {
    showToast('Invalid promo code. Use FOOD10 or MUNCH20!', 'fa-triangle-exclamation');
  }
}

function proceedToCheckout() {
  if (!STATE.user) {
    showToast('Please Sign In to place your order!', 'fa-user-lock');
    window.location.hash = '#sign-in';
  } else {
    window.location.hash = '#checkout';
  }
}

// 5. Checkout View
function renderCheckout() {
  const root = document.getElementById('app-root');
  if (!root) return;

  if (STATE.cart.length === 0) {
    window.location.hash = '#cart';
    return;
  }

  const cartSubtotal = STATE.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = cartSubtotal > 499 ? 0 : 40;
  let discountAmount = 0;
  if (STATE.promo) {
    discountAmount = Math.round(cartSubtotal * (STATE.promo.discount / 100));
  }
  const finalTotal = cartSubtotal + deliveryFee - discountAmount;

  root.innerHTML = `
    <div class="checkout-container">
      <h2>Complete Checkout</h2>
      <form id="checkout-form" onsubmit="submitOrder(event)">
        
        <div class="form-group">
          <label for="checkout-phone">Registered Contact Number</label>
          <input type="tel" id="checkout-phone" value="${STATE.user ? STATE.user.phone : ''}" disabled required>
        </div>

        <div class="form-group">
          <label for="checkout-name">Recipient Full Name</label>
          <input type="text" id="checkout-name" placeholder="Rahul Sharma" required>
        </div>

        <div class="form-group">
          <label for="checkout-address">Delivery Street Address</label>
          <textarea id="checkout-address" rows="3" placeholder="Apartment / Flat #, Street, City" required>${STATE.location !== 'Hyderabad, India' ? STATE.location : ''}</textarea>
        </div>

        <div class="form-group">
          <label>Choose Payment Mode</label>
          <div class="payment-method-selector">
            <div class="pay-card selected" onclick="selectPayment(this, 'UPI')">
              <i class="fa-solid fa-mobile-screen-button"></i>
              <span>UPI / QR</span>
            </div>
            <div class="pay-card" onclick="selectPayment(this, 'Card')">
              <i class="fa-regular fa-credit-card"></i>
              <span>Credit Card</span>
            </div>
            <div class="pay-card" onclick="selectPayment(this, 'COD')">
              <i class="fa-solid fa-hand-holding-dollar"></i>
              <span>Cash on Delivery</span>
            </div>
          </div>
          <input type="hidden" id="selected-payment-method" value="UPI">
        </div>

        <button type="submit" class="checkout-submit-btn">
          Pay & Confirm Order (₹${finalTotal})
        </button>
      </form>
    </div>
  `;
}

function selectPayment(el, method) {
  document.querySelectorAll('.pay-card').forEach(card => card.classList.remove('selected'));
  el.classList.add('selected');
  const input = document.getElementById('selected-payment-method');
  if (input) input.value = method;
}

function submitOrder(e) {
  e.preventDefault();
  const name = document.getElementById('checkout-name').value;
  const address = document.getElementById('checkout-address').value;
  const payment = document.getElementById('selected-payment-method').value;

  // Save location to state if changed
  saveLocation(address);
  
  // Clear cart, clear promo
  const orderId = 'FM' + Math.floor(100000 + Math.random() * 900000);
  const cartCopy = [...STATE.cart];
  
  STATE.cart = [];
  saveCart();
  savePromo(null);
  syncHeaderState();

  // Redirect to success
  window.location.hash = `#success/${orderId}?name=${encodeURIComponent(name)}&pay=${payment}`;
}

// 6. Success View
function renderSuccess(orderId, params) {
  const root = document.getElementById('app-root');
  if (!root) return;

  const urlParams = new URLSearchParams(params);
  const name = urlParams.get('name') || 'Customer';
  const payMode = urlParams.get('pay') || 'UPI';

  root.innerHTML = `
    <div class="success-card">
      <div class="checkmark-circle">
        <i class="fa-solid fa-check"></i>
      </div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you, <b>${name}</b>. Your gourmet feast is being prepared with top hygiene standards.</p>
      
      <div class="order-meta-info">
        <div class="order-meta-row">
          <span>Order ID:</span>
          <span>${orderId}</span>
        </div>
        <div class="order-meta-row">
          <span>Payment Status:</span>
          <span>${payMode === 'COD' ? 'Pending (COD)' : 'Paid online via ' + payMode}</span>
        </div>
        <div class="order-meta-row">
          <span>Est. Delivery:</span>
          <span style="color:var(--primary-dark);">25 - 30 minutes</span>
        </div>
      </div>
      
      <p style="font-size:12px;color:var(--text-muted);line-height:1.4;">A live tracking SMS has been simulated and sent to your registered contact.</p>
      
      <button class="success-home-btn" onclick="window.location.hash='#home'">
        Order Something Else
      </button>
    </div>
  `;
}

// 7. Sign In View
let simulatedOtp = null;
let otpTimerInterval = null;

function renderSignIn() {
  const root = document.getElementById('app-root');
  if (!root) return;

  root.innerHTML = `
    <div class="signin-card">
      <img src="https://assets.ccbp.in/frontend/responsive-website/food-munch-img.png" class="signin-header-img" alt="Food Munch Logo">
      <h2>Sign In</h2>
      <p>Secure login with standard mobile OTP verification.</p>
      
      <!-- Phone form -->
      <div id="phone-entry-zone">
        <form onsubmit="handleSendOtp(event)">
          <div class="form-group" style="text-align:left;">
            <label for="login-phone">10-Digit Mobile Number</label>
            <input type="tel" id="login-phone" placeholder="e.g. 9876543210" pattern="[0-9]{10}" required>
          </div>
          <button type="submit" class="signin-submit-btn">Send Verification OTP</button>
        </form>
      </div>

      <!-- OTP Form (Hidden initially) -->
      <div id="otp-entry-zone" style="display:none;">
        <p style="font-size:13px;margin-bottom:12px;color:var(--text-main);">We sent an OTP code to your device</p>
        <form onsubmit="handleVerifyOtp(event)">
          <div class="otp-box-container">
            <input type="text" class="otp-digit-input" maxlength="1" required onkeyup="moveOtpFocus(this, 1)">
            <input type="text" class="otp-digit-input" maxlength="1" required onkeyup="moveOtpFocus(this, 2)">
            <input type="text" class="otp-digit-input" maxlength="1" required onkeyup="moveOtpFocus(this, 3)">
            <input type="text" class="otp-digit-input" maxlength="1" required onkeyup="moveOtpFocus(this, 4)">
            <input type="text" class="otp-digit-input" maxlength="1" required onkeyup="moveOtpFocus(this, 5)">
            <input type="text" class="otp-digit-input" maxlength="1" required onkeyup="moveOtpFocus(this, 6)">
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:20px;" id="otp-timer-lbl">Resend code in 59s</div>
          <button type="submit" class="signin-submit-btn">Confirm & Log In</button>
        </form>
        <button class="back-to-phone-btn" onclick="backToPhoneEntry()"><i class="fa-solid fa-arrow-left"></i> Change Number</button>
      </div>
    </div>
  `;
}

function handleSendOtp(e) {
  e.preventDefault();
  const phone = document.getElementById('login-phone').value;
  simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Show visual OTP trigger SMS popup
  showSimulatedSms(phone, simulatedOtp);
  
  // Hide phone form, show OTP form
  document.getElementById('phone-entry-zone').style.display = 'none';
  document.getElementById('otp-entry-zone').style.display = 'block';
  
  // Focus first field
  const firstInput = document.querySelector('.otp-digit-input');
  if (firstInput) firstInput.focus();

  // Start timer
  startOtpTimer();
}

function showSimulatedSms(phone, otp) {
  let sms = document.getElementById('simulated-sms-bubble');
  if (!sms) {
    sms = document.createElement('div');
    sms.id = 'simulated-sms-bubble';
    sms.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #1e1e1e;
      color: #ffffff;
      padding: 16px 20px;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      border: 1px solid rgba(255,255,255,0.1);
      width: 320px;
      font-family: system-ui, sans-serif;
      animation: slideDownFade 0.35s ease;
    `;
    document.body.appendChild(sms);
  }
  sms.innerHTML = `
    <div style="display:flex;justify-content:between;margin-bottom:8px;font-size:11px;color:rgba(255,255,255,0.5);">
      <span>💬 MESSAGES (SIMULATOR)</span>
      <span style="margin-left:auto;">now</span>
    </div>
    <div style="font-weight:700;font-size:13px;margin-bottom:4px;">Food Matrix OTP</div>
    <div style="font-size:13px;line-height:1.4;">Your Food Matrix verification code is <b style="color:var(--primary);font-size:15px;letter-spacing:1px;">${otp}</b>. Valid for 5 minutes. Do not share.</div>
  `;

  // Remove SMS after 10 seconds
  clearTimeout(sms._timer);
  sms._timer = setTimeout(() => {
    sms.style.animation = 'slideDownFade 0.3s ease reverse';
    setTimeout(() => sms.remove(), 300);
  }, 10000);
}

function startOtpTimer() {
  let seconds = 59;
  const lbl = document.getElementById('otp-timer-lbl');
  if (!lbl) return;

  clearInterval(otpTimerInterval);
  otpTimerInterval = setInterval(() => {
    seconds--;
    if (seconds > 0) {
      lbl.textContent = `Resend code in ${seconds}s`;
    } else {
      lbl.textContent = 'You can now resend the OTP';
      clearInterval(otpTimerInterval);
    }
  }, 1000);
}

function moveOtpFocus(el, index) {
  if (el.value.length === 1 && index < 6) {
    const next = document.querySelectorAll('.otp-digit-input')[index];
    if (next) next.focus();
  }
}

function handleVerifyOtp(e) {
  e.preventDefault();
  const digits = Array.from(document.querySelectorAll('.otp-digit-input')).map(i => i.value).join('');
  
  if (digits === simulatedOtp) {
    clearInterval(otpTimerInterval);
    const phone = document.getElementById('login-phone') ? document.getElementById('login-phone').value : '9876543210';
    
    STATE.user = { phone };
    saveUser();
    syncHeaderState();
    
    // Clear simulated SMS bubble
    const sms = document.getElementById('simulated-sms-bubble');
    if (sms) sms.remove();

    showToast('Signed in successfully!', 'fa-circle-check');
    window.location.hash = '#home';
  } else {
    showToast('Invalid OTP entered. Please try again!', 'fa-circle-xmark');
  }
}

function backToPhoneEntry() {
  clearInterval(otpTimerInterval);
  document.getElementById('otp-entry-zone').style.display = 'none';
  document.getElementById('phone-entry-zone').style.display = 'block';
  simulatedOtp = null;
}

// ── Routing Handler ────────────────────────────────────────
function renderView() {
  const hash = window.location.hash || '#home';
  
  // Clear active query states
  STATE.searchQuery = '';
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) searchInput.value = '';

  // Close location picker drop
  const drop = document.getElementById('location-dropdown-menu');
  if (drop) drop.classList.remove('active');

  // Parse path
  if (hash === '#home' || hash === '') {
    renderHome();
  } else if (hash.startsWith('#category/')) {
    const catId = hash.split('/')[1];
    renderCategory(catId);
  } else if (hash === '#cart') {
    renderCart();
  } else if (hash === '#checkout') {
    renderCheckout();
  } else if (hash.startsWith('#success/')) {
    const temp = hash.split('/');
    const rest = temp[1].split('?');
    const orderId = rest[0];
    const params = rest[1] || '';
    renderSuccess(orderId, params);
  } else if (hash === '#sign-in') {
    renderSignIn();
  } else {
    // Default 404 handler
    const root = document.getElementById('app-root');
    if (root) {
      root.innerHTML = `<div style="text-align:center;padding:100px 20px;"><h2>Route ${hash} not found</h2><a href="#home">Back to Menu</a></div>`;
    }
  }

  // Scroll to top on route change
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ── Setup Global Event Listeners ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Init Header states
  syncHeaderState();

  // Search input handler
  const search = document.getElementById('global-search-input');
  if (search) {
    search.addEventListener('input', handleGlobalSearch);
  }

  // Location Selector dropdown toggle
  const locPicker = document.getElementById('header-location-picker');
  const locMenu = document.getElementById('location-dropdown-menu');
  if (locPicker && locMenu) {
    locPicker.addEventListener('click', (e) => {
      // Toggle if clicking loc-picker directly, but ignore if clicks inside menu
      if (!locMenu.contains(e.target)) {
        locMenu.classList.toggle('active');
      }
    });

    const confirmBtn = document.getElementById('save-location-btn');
    const inputField = document.getElementById('location-input-field');
    if (confirmBtn && inputField) {
      confirmBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = inputField.value.trim();
        if (value.length > 0) {
          saveLocation(value);
          syncHeaderState();
          showToast(`Location updated to <b>${value}</b>`);
          locMenu.classList.remove('active');
        } else {
          showToast('Please enter a valid address', 'fa-triangle-exclamation');
        }
      });
    }
  }

  // Close location menu if clicked anywhere else
  document.addEventListener('click', (e) => {
    if (locPicker && !locPicker.contains(e.target)) {
      locMenu.classList.remove('active');
    }
  });

  // Setup router listeners
  window.addEventListener('hashchange', renderView);
  
  // Initial page load trigger
  setTimeout(() => {
    renderView();
  }, 350); // Small delay to show smooth initial gourmet loading spinner
});
