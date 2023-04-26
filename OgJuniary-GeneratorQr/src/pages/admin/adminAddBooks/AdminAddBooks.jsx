import Header from "../../../components/admin/adminHeader/Header";
import { Link, useNavigate } from "react-router-dom";
import getImageKey from "./../../../components/getImageKey";
import { MultiSelect } from "primereact/multiselect";
import "./adminAddBooks.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import GeneratorQr from "../../../components/Generator-qr/generator";
export const AdminAddBook = () => {
  const [options, setOptions] = useState({
    genres: [""],
    image: "",
    title: "",
    author: "",
    year: "",
    description: "",
  });
  const [genre,setGenre] = useState();
  useEffect(() => {
    const getBook = async () => {
      const genna = await axios.get("http://localhost:8000/genre/");
      setGenre(genna.data);
    };

    getBook();
  }, [genre]);
  const [selectImg, setSelectImg] = useState(null);
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };
  const loadImg = (e) => {
    const selectImg = e.target.files[0];
    setSelectImg(selectImg);
  };
  const handleSaveForm = (e) => {
    e.preventDefault();
    const postBook = async () => {
      const response = await axios.post("http://127.0.0.1:8000/api/books/",options);
      console.log(response.data);
    };

    postBook();
    console.log(options);
  };

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

  const genres = genre;
  return (
    <div>
      <Header />
      <div className="add__content">
        <div className="search__content">
          <label className="search__pos">
            <img
              className="search__logo"
              src={getImageKey("searchIcon")}
              alt=""
            />
            <input className="search__input" type="text" placeholder="Поиск" />
          </label>
          <button className="search__add-books">
            <Link to="" className="search__add-link">
              Добавить книгу
            </Link>
          </button>
        </div>
        <div className="add__info">
          <div className="add__wrap">
            <div className="add__download">
              {options.image ? (
                <img className="add__download-img" src={options.image} />
              ) : (
                <canvas className="add__download-canvas" />
              )}
              <button className="add__download-btn">
                <input
                  type="file"
                  onChange={(e) => loadImg(e)}
                  accept=".png, .jpg, jpeg*"
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
                <div className="add__creation-rating">
                  Здесь будет рейтинг, а пока нам плевать на ваше мнение
                </div>
                <label className="label__genre">
                  Жанры:
                  <MultiSelect
                    value={options.selectedGenres}
                    onChange={(e) =>
                      setOptions({ ...options, selectedGenres: e.target.value })
                    }
                    options={genres}
                    optionLabel="name"
                    filter
                    placeholder="Выберите жанры"
                    maxSelectedLabels={10}
                    removeIcon={false}
                    closeIcon={false}
                    display="chip"
                    className="w-full md:w-31rem multiselect"
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
                  <button
                    className="add__save"
                    onClick={(e) => handleSaveForm(e)}
                  >
                    Сохранить
                  </button>
                  <button className="add__cancel" onClick={handleCancel}>
                    Отменить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <GeneratorQr/>
    </div>
  );
};
