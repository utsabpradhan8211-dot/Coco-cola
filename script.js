const tabs = document.querySelectorAll('.tab');
const buttons = document.querySelectorAll('.menu-item');
const viewSwitch = document.getElementById('viewSwitch');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;
    buttons.forEach((b) => b.classList.remove('active'));
    tabs.forEach((tab) => tab.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

viewSwitch.addEventListener('change', (event) => {
  const adminTabButton = document.querySelector('[data-tab="admin"]');
  if (event.target.value === 'admin') {
    adminTabButton.classList.remove('admin-hidden');
  } else {
    adminTabButton.classList.add('admin-hidden');
    const adminTab = document.getElementById('admin');
    if (adminTab.classList.contains('active')) {
      adminTab.classList.remove('active');
      document.getElementById('overview').classList.add('active');
      buttons.forEach((b) => b.classList.remove('active'));
      document.querySelector('[data-tab="overview"]').classList.add('active');
    }
  }
});

// Default to employee mode by hiding admin controls
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('[data-tab="admin"]').classList.add('admin-hidden');
});
