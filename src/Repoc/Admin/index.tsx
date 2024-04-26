import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, getAllCollections, deleteCollection, fetchUserDetails } from "./client";
import { ImGithub } from "react-icons/im";
import { Link, useParams } from "react-router-dom";

export default function Admin() {
  const { adminId } = useParams();
  const [ admin, setAdmin ] = useState(""); 
  const [users, setUsers] = useState<any>([]);
  const [collections, setCollections] = useState<any>([]);
  const [activeTab, setActiveTab] = useState("Users");

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        const filteredUsers = response.filter((user:any) => user._id !== adminId);
        setUsers(filteredUsers); // Assuming response.data is the array of users
        const adminUser = await fetchUserDetails(adminId);
        setAdmin(adminUser.name);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    const fetchCollections = async () => {
        try {
          const response = await getAllCollections();
          setCollections(response); // Assuming response.data is the array of users
        } catch (error) {
          console.error("Error fetching Collections:", error);
        }
      };
    fetchUsers();
    fetchCollections();
  }, []);

  const handleDeleteUser = async (userId: any) => {
    try {
      await deleteUser(userId);
      // Remove the deleted user from the users array
      setUsers(users.filter((user: any) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleDeleteCollection = async (collectionId: any) => {
    try {
      await deleteCollection(collectionId);
      // Remove the deleted user from the users array
      setCollections(collections.filter((collection: any) => collection._id !== collectionId));
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  return (
    <div className="container">
        <div className="p-3 d-flex justify-content-between">
          <h3>Admin Dashboard</h3>
          <br />
          <Link className="btn btn-dark" to={`/Search/${adminId}`}>Search RepoC</Link>
        </div>
        <h4 className="p-3">Welcome, {admin}</h4>
      <div className="p-3">
        {/* <h2>Tabs</h2> */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Users" ? "active" : ""}`}
              onClick={() => setActiveTab("Users")}
            >
              Users
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "Collections" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Collections")}
            >
              Collections
            </button>
          </li>
        </ul>
        {/* Render content based on active tab */}
        {activeTab === "Users" && (
          <div className="container pt-2">
            <div className="d-flex justify-content-between pb-2">
              <h3>Users</h3>
            </div>
            <div className="row text-center">
              {users.length > 0 ? (
                <div className="col mb-2">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">UserName</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">UserType</th>
                        <th scope="col">Collections Owned</th>
                        <th scope="col">Collections Collaborated</th>
                        <th scope="col">Collections Saved</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((user: any) => (
                          <tr key={user._id}>
                            <td scope="col">{user.username}</td>
                            <td scope="col">{user.name}</td>
                            <td scope="col">{user.email}</td>
                            <td scope="col">{user.userType}</td>
                            <td scope="col">{user.collectionsOwned.length}</td>
                            <td scope="col">{user.collectionsCollaborated.length}</td>
                            <td scope="col">{user.collectionsSaved.length}</td>
                            <td scope="col">
                              <button
                              className="btn btn-outline-danger"
                                onClick={() => handleDeleteUser(user._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                </div>
              ) : (
                <div className="container text-center m-4">
                  <ImGithub color="black" size={20} />
                  <h5>No Users Available</h5>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "Collections" && (
          <div className="container pt-2">
            <div className="d-flex justify-content-between pb-2">
              <h3>Collections</h3>
            </div>
            <div className="row text-center">
              {collections.length > 0 ? (
                <div className="col mb-2">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Collection Name</th>
                        <th scope="col">Collection Type</th>
                        <th scope="col">Collection Owner</th>
                        <th scope="col">No of Repos</th>
                        <th scope="col">Collection Collaborated By</th>
                        <th scope="col">Collection Saved By</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {collections &&
                        collections.map((collection: any) => (
                          <tr key={collection._id}>
                            <td scope="col">{collection.collectionName}</td>
                            <td scope="col">{collection.collectionType}</td>
                            <td scope="col">{collection.ownerName}</td>
                            <td scope="col">{collection.githubRepos.length}</td>
                            <td scope="col">{collection.collaborators.length}</td>
                            <td scope="col">{collection.savedBy.length}</td>
                            <td scope="col">
                              <button
                              className="btn btn-outline-danger"
                                onClick={() => handleDeleteCollection(collection._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                </div>
              ) : (
                <div className="container text-center m-4">
                  <ImGithub color="black" size={20} />
                  <h5>No Users Available</h5>
                </div>
              )}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
