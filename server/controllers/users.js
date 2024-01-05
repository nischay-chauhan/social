import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const friends = await Promise.all(
            user.friends.map((friendId) => {
                return User.findById(friendId);
            })
        );

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picture }) => {
            return { _id, firstName, lastName, occupation, location, picture };
        });

        res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: "User or friend not found." });
        }

        if (!user.friends || !friend.friends) {
            return res.status(400).json({ message: "User or friend friends list not properly initialized." });
        }

        const isFriend = user.friends.includes(friendId);

        if (isFriend) {
            user.friends = user.friends.filter((userId) => userId !== friendId);
            friend.friends = friend.friends.filter((userId) => userId !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const formattedFriends = friend.friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        });

        res.status(200).json(formattedFriends);
    } catch (error) {
        console.error("Error in addRemoveFriend:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
