let n = null;
let h = null;
const submitButton = document.getElementById("submit-btn");
const displaySect = document.getElementById("display");
const errSect = document.getElementById("error");
const annualResultGross = document.getElementById("an-result-g");
const annualResultNet = document.getElementById("an-result-n");
const monthlyResultGross = document.getElementById("mo-result-g");
const monthlyResultNet = document.getElementById("mo-result-n");
const weeklyResultGross = document.getElementById("wk-result-g");
const weeklyResultNet = document.getElementById("wk-result-n");

const wk = () => n * h;
const mo = () => (n * h * 52) / 12;
const yr = () => n * h * 52;

let tax;

const wkNet = () => wk(n, h) - tax(n, h) / 52;
const moNet = () => mo(n, h) - tax(n, h) / 12;
const yrNet = () => yr(n, h) - tax(n, h);

const doSomeMath = (func) => func(n, h);

const submit = submitButton.addEventListener("click", () => {
  n = Number(document.getElementById("salary").value);
  h = Number(document.getElementById("hours").value);
  if (n !== 0 && h !== 0) {
    calculateTaxes();
    showSalaries();
  } else numError();
});

const showSalaries = () => {
  if (typeof n === "number" && typeof h === "number") {
    calculateSalaries();
    displaySect.style.display = "flex";
    errSect.style.display = "none";
  } else numError();
};

const calculateTaxes = () => {
  if(yr(h,n) < 9501){
    tax = () => yr(n, h) * 0.10;
  } else if(yr(h,n) > 9950 && yr(h,n) < 40526){
    tax = () => (yr(n, h)-9950) * 0.12 + 995;
  }else if(yr(h,n) > 40525 && yr(h,n) < 86376){
    tax = () => (yr(n, h)-40525) * 0.22 + 4664;
  } else if(yr(h,n) > 86375 && yr(h,n) < 164926){
    tax = () => (yr(n, h)-86375) * 0.24 + 29502;
  } else if(yr(h,n) > 164925 && yr(h,n) < 209426){
    tax = () => (yr(n, h)-164925) * 0.32 + 33603;
  }else if(yr(h,n) > 209425 && yr(h,n) < 523601){
    tax = () => (yr(n, h)-209425) * 0.35 + 47843;
  }else if(yr(h,n) > 523600){
    tax = () => (yr(n, h)-523600) * 0.37 + 157804.25;
  } else tax = () => yr(n, h) * 0;
}

const calculateSalaries = () => {
  annualResultGross.textContent = Math.round(yr(n, h)).toLocaleString();
  annualResultNet.textContent = Math.round(yrNet(n, h)).toLocaleString();
  monthlyResultGross.textContent = Math.round(mo(n, h)).toLocaleString();
  monthlyResultNet.textContent = Math.round(moNet(n, h)).toLocaleString();
  weeklyResultGross.textContent = Math.round(wk(n, h)).toLocaleString();
  weeklyResultNet.textContent = Math.round(wkNet(n, h)).toLocaleString();
};

const numError = () => {
  displaySect.style.display = "none";
  errSect.style.display = "flex";
  errSect.textContent = "Please enter valid numbers greater than 0.";
};
