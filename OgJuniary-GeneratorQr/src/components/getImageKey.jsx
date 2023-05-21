import userIcon from "./../assets/icons/main/user-icon.svg";
import passwordIcon from "./../assets/icons/main/password-icon.svg";
import googleIcon from "./../assets/icons/main/icon-google.svg";
import Logo from "./../assets/icons/main/Logo.png";
import searchIcon from "./../assets/icons/main/Navbar/search-line.svg";

import UserIcon from "./../assets/icons/main/Navbar/user-avatar.svg";
import HeartIcon from "./../assets/icons/main/Navbar/Heart-black.svg";
import CatalogIcon from "./../assets/icons/main/Navbar/Catalog-black.svg";
import HistoryIcon from "./../assets/icons/main/Navbar/History-black.svg";
import TakenBookIcon from "./../assets/icons/main/Navbar/TakenBook-black.svg";

import User from "./../assets/icons/admin/user.svg";
import IconCatalog from "./../assets/icons/admin/book-open-line.svg";
import IconSort from "./../assets/icons/admin/align-left.svg";
import IconEdit from "./../assets/icons/admin/pencil-line.svg";
import IconTrash from "./../assets/icons/admin/delete-bin-line.svg";
import IconQR from "./../assets/icons/admin/qr-code-line.svg";
import Download from "./../assets/icons/admin/camera-off-line.svg";
import IconCloseX from "./../assets/icons/admin/close_x.svg";
import SortArrow from "./../assets/icons/admin/sort-arrow.svg";

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
  User,
  IconCloseX,
  SortArrow,
};

function getImageKey(key) {
  return images[key];
}

export default getImageKey;
