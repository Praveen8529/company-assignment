import "./styles.css";
import SearchBox from "./component/SearchBox";
import List from "./component/List";
import userList from "./config/data";
import { React, useState, useEffect } from "react";

function App() {
  const [right, setRight] = useState([]);
  const [left, setLeft] = useState([]);

  const handelLeftUpdates = (id) => {
    //update right for selected color changes and right List
    const findRightElement = right.find((x) => x.id === id);
    if (!findRightElement) {
      let selectedUser = userList.find((x) => x.id === id);
      selectedUser.selected = true;
      setRight((prev) => [...prev, selectedUser]);

      //update left for selected color changes
      const leftList = left.map((item) => {
        let updateItem =
          item.id === id ? { ...item, selected: true } : { ...item };
        return updateItem;
      });
      setLeft(leftList);
    }
  };
  const handelRightUpdates = (id) => {
    let updateLeft = right.find((x) => x.id === id);
    const leftList = left.map((item) => {
      let updateItem =
        item.id === updateLeft.id ? { ...item, selected: false } : { ...item };
      return updateItem;
    });
    setLeft(leftList);

    let selectedUser = right.filter((x) => x.id !== id);
    setRight(selectedUser);
  };

  const handelSearch = (query) => {
    if (query.trim().length > 0) {
      const res = userList.filter((obj) =>
        Object.values(obj).some((val) => {
          if (typeof val !== "boolean") return val.includes(query);
        })
      );
      setLeft(res);
    } else setLeft(userList);
  };

  useEffect(() => {
    setLeft(userList);
  }, []);

  return (
    <div className="App">
      <SearchBox onSearch={handelSearch} />
      <div className="list-row-container">
        <List
          key={"left"}
          userListSet={left}
          onCustomClick={handelLeftUpdates}
        />
        <List
          key={"right"}
          onCustomClick={handelRightUpdates}
          userListSet={right}
        />
      </div>
    </div>
  );
}

export default App;
