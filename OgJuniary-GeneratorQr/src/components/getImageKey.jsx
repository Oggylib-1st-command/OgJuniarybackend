import userIcon from "./../assets/icons/main/user-icon.svg";
import passwordIcon from "./../assets/icons/main/password-icon.svg";
import googleIcon from "./../assets/icons/main/icon-google.svg";
import Logo from "./../assets/icons/main/Logo.png";
import searchIcon from "./../assets/icons/main/Navbar/search-icon.svg";

import UserIcon from "./../assets/icons/main/Navbar/user-avatar.svg";
import HeartIcon from "./../assets/icons/main/Navbar/Heart-black.svg";
import CatalogIcon from "./../assets/icons/main/Navbar/Catalog-black.svg";
import HistoryIcon from "./../assets/icons/main/Navbar/History-black.svg";
import TakenBookIcon from "./../assets/icons/main/Navbar/TakenBook-black.svg";

import IconCatalog from "./../assets/icons/admin/icon-catalog.svg";
import IconSort from "./../assets/icons/admin/icon-sort.svg";
import IconEdit from "./../assets/icons/admin/edit.svg";
import IconTrash from "./../assets/icons/admin/trash.svg";
import IconQR from "./../assets/icons/admin/QR.svg";
import Download from "./../assets/icons/admin/download.svg";
import IconCloseX from "./../assets/icons/admin/close_x.svg";


const images = {
  userIcon,
  passwordIcon,
  googleIcon,
  Logo,
  searchIcon,
  UserIcon,
  HeartIcon,
  CatalogIcon,
  HistoryIcon,
  TakenBookIcon,
  IconCatalog,
  IconEdit,
  IconTrash,
  IconQR,
  IconSort,
  Download,
  IconCloseX,
};

function getImageKey(key) {
  return images[key];
}

export default getImageKey;
