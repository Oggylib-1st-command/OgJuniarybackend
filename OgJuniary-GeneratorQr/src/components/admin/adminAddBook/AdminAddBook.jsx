import getImageKey from "./../../../components/getImageKey";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./adminAddBook.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { axiosBookById } from "../../../store/books/Slice";
import { useParams } from "react-router-dom";
import { getCurrentBook } from "../../../store/books/selectors";

const lang = {
  fir: "Русский",
  sec: "English",
  null: "",
  get(lanId) {
    if (lanId === 1) return this.fir;
    else if (lanId === 2) return this.sec;
    else return this.null;
  },
};
export const AdminAddBook = () => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.book);
  const [genresForSelect, setGenresForSelect] = useState([]);
  const [languagesForSelect, setLanguagesForSelect] = useState([]);
  const { id } = useParams();
  const [defaultGenre, setDefaultGenre] = useState([]);
  const [defaultLanguage, setDefaultLanguage] = useState({});
  const [options, setOptions] = useState(book);
  const [allGenres, setAllGenre] = useState([]);
  const [allLanguagles, setAllLanguagles] = useState([]);
  const [selectImg, setSelectImg] = useState(null);
  const navigate = useNavigate();

  if (book.id !== 0 && options.id === 0) {
    setOptions(book);
  }
  useEffect(() => {
    const dGen = book.genres.map((el, index) => {
      const obj = { value: "", label: "" };
      obj.value = el;
      obj.label = el;
      return obj;
    });

    const dLan = { value: book.languages, label: book.languages };
    setDefaultLanguage(lang.get(dLan.label));
    setDefaultGenre(dGen);
  }, [book.genres, book.languagle]);

  useEffect(() => {
    const gen = allGenres.map((el, index) => {
      const obj = { value: "", label: "" };
      obj.value = el.name;
      obj.label = el.name;
      return obj;
    });

    const lan = allLanguagles.map((el, index) => {
      const obj = { value: 0, label: "" };
      obj.value = el.id;
      obj.label = el.name;
      return obj;
    });
    setGenresForSelect(gen);
    setLanguagesForSelect(lan);
  }, [allLanguagles, allGenres]);

  useEffect(() => {
    const getGenre = async () => {
      const genna = await axios.get("http://localhost:8000/genre/");
      setAllGenre(genna.data);
    };
    const getLanguagle = async () => {
      const lang = await axios.get("http://localhost:8000/language/");
      setAllLanguagles(lang.data);
    };
    getGenre();
    getLanguagle();
    if (id !== undefined && book.id === 0) dispatch(axiosBookById(id));
  }, []);

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (selectImg) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setOptions((prevState) => ({
            ...options,
            image: result,
          }));
        }
      };
      fileReader.readAsDataURL(selectImg);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [selectImg]);

  const handleCancel = (props) => {
    if (props === 0) {
      navigate(`/admin/catalog`);
    } else {
      navigate(`/admin/catalog/${props}`);
    }
  };

  const loadImg = (e) => {
    const selectImg = e.target.files[0];
    setSelectImg(selectImg);
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (options.id === 0) {
      const postBook = async () => {
        const response = await axios.post(
          "http://127.0.0.1:8000/books/",
          options
        );
        console.log(response);
        navigate(-1);
      };
      postBook();
    } else {
      const patchBook = async () => {
        const response = await axios.patch(
          `http://127.0.0.1:8000/books/${book.id}/`,
          options
        );
        console.log(response);
        navigate(`/admin/catalog/${book.id}`);
      };
      patchBook();
    }
  };

  return (
    <div className="add__wrap">
      <div className="add__download">
        {options.image ? (
          <img className="add__download-img" src={options.image} />
        ) : (
          <div className="add__download-canvas">
            <img
              className="download__bg"
              src={getImageKey("Download")}
              alt=""
            />
            <input
              type="file"
              onChange={(e) => loadImg(e)}
              accept=".png, .jpg, jpeg*"
              className="input__file"
            />
          </div>
        )}
        <button className="add__download-btn">
          <input
            type="file"
            onChange={(e) => loadImg(e)}
            accept=".png, .jpg,.webp, jpeg*"
            className="input__file"
          />
          Загрузить фото
        </button>
      </div>
      <div className="add__creation">
        <form className="add__creation-form">
          <input
            className="add__creation-title"
            type="text"
            value={options.title}
            onChange={(e) =>
              setOptions(() => ({ ...options, title: e.target.value }))
            }
            required
          />
          <label className="label__author" htmlFor="add__creation-author">
            Автор:
            <input
              type="text"
              className="add__creation-author"
              value={options.author}
              onChange={(e) =>
                setOptions(() => ({ ...options, author: e.target.value }))
              }
              required
            />
          </label>
          <label htmlFor="add__creation-year" className="label__year">
            Год издания:
            <input
              className="add__creation-year"
              type="text"
              value={options.year}
              onChange={(e) =>
                setOptions(() => ({ ...options, year: e.target.value }))
              }
              required
            />
          </label>
          <label className="label__languagle">
            Язык:
            <Select
              defaultValue={defaultLanguage}
              placeholder="Выберите язык"
              options={languagesForSelect}
              className="w-180 md:w-31rem multiselect"
              onChange={(e) => {
                setDefaultLanguage(e);
                setOptions({ ...options, languages: e.value });
              }}
            />
          </label>
          <label className="label__genre">
            Жанры:
            <Select
              onChange={(e) => {
                setDefaultGenre(e);
                setOptions({
                  ...options,
                  genres: e.map((elem) => elem.value),
                });
              }}
              closeMenuOnSelect={false}
              value={defaultGenre}
              isMulti
              placeholder="Выберите жанры"
              options={genresForSelect}
              className="w-full md:w-31rem"
            />
          </label>
          <label htmlFor="add__creation-description">
            Описание книги
            <textarea
              type="text"
              className="add__creation-description"
              value={options.description}
              onChange={(e) =>
                setOptions(() => ({
                  ...options,
                  description: e.target.value,
                }))
              }
              required
            />
          </label>
          <div className="add__creation-btn">
            <button className="add__save" onClick={(e) => handleSaveForm(e)}>
              Сохранить
            </button>
            <button
              className="add__cancel"
              onClick={() => handleCancel(book.id)}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
