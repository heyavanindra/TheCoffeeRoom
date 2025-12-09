import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
const server = createServer();
import { userQueue } from "@repo/queue";
import { createRemoteJWKSet, jwtVerify } from "jose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

console.log("🚀 WebSocket Server Starting...");
console.log("📍 Port:", PORT);
console.log("🔐 AUTH_URL:", process.env.AUTH_URL);
console.log("🔑 BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);

const wsServer = new WebSocketServer({ server });

async function validateToken(token: string) {
  console.log("🔍 Validating token...");
  try {
    const jwksUrl = `${process.env.AUTH_URL}/api/auth/jwks`;
    console.log("📡 JWKS URL:", jwksUrl);

    const JWKS = createRemoteJWKSet(new URL(jwksUrl));

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: process.env.BETTER_AUTH_URL,
      audience: process.env.BETTER_AUTH_URL,
    });

    console.log("✅ Token validated successfully for user:", payload.id);
    return payload;
  } catch (error) {
    console.error("❌ Token validation failed:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : error
    );
    return undefined;
  }
}

type UserProps = {
  ws: WebSocket;
  roomId: string[];
  userId: string;
};

let User: UserProps[] = [];

wsServer.on("connection", async (ws, req) => {
  console.log("\n🔌 New WebSocket connection attempt");
  console.log("📋 Request URL:", req.url);

  const token = req.url?.split("token=")[1];
  if (!token) {
    console.log("❌ No token provided, closing connection");
    ws.close();
    return;
  }

  console.log(
    "🔑 Token received (first 20 chars):",
    token.substring(0, 20) + "..."
  );

  const userId = await validateToken(token);
  if (!userId) {
    console.log("❌ Invalid token, closing connection");
    ws.close();
    return;
  }

  const newUser = {
    userId: String(userId.id),
    roomId: [],
    ws: ws,
  };

  User.push(newUser);
  console.log("✅ User connected:", newUser.userId);
  console.log("👥 Total connected users:", User.length);

  ws.on("close", () => {
    console.log("🔌 WebSocket closed for user:", newUser.userId);
    User = User.filter((x) => x.ws !== ws);
    console.log("👥 Remaining connected users:", User.length);
  });

  ws.on("message", (data) => {
    const parsedData = JSON.parse(data.toString());
    console.log("\n📨 Message received:");
    console.log("  Type:", parsedData.type);
    console.log("  From user:", newUser.userId);

    if (parsedData.type === "join_room") {
      const user = User.find((x) => x.ws === ws);
      user?.roomId.push(parsedData.roomId);
      console.log("🚪 User joined room:", parsedData.roomId);
      console.log("  User rooms:", user?.roomId);
      return;
    }

    if (parsedData.type === "leave_room") {
      const user = User.find((x) => x.ws === ws);
      if (!user) {
        console.log("❌ User not found for leave_room");
        return;
      }
      user.roomId = user.roomId.filter((x) => x !== parsedData.roomId);
      console.log("🚪 User left room:", parsedData.roomId);
      console.log("  Remaining rooms:", user.roomId);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const shape = parsedData.message;
      console.log("💬 Chat message in room:", roomId);

      let sentCount = 0;
      User.map((user, _) => {
        if (user.roomId == roomId && user.ws != ws) {
          user.ws.send(JSON.stringify(parsedData));
          sentCount++;
        }
      });
      console.log("  📤 Sent to", sentCount, "users in room");

      userQueue.add("shapesQueue", {
        shapes: shape,
        roomId: roomId,
        shapeAction: "CREATE",
      });
      console.log("  ✅ Added to queue");
    } else if (parsedData.type === "update_message") {
      const roomId = parsedData.roomId;
      console.log("✏️ Update message in room:", roomId);

      let sentCount = 0;
      User.map((user, _) => {
        if (user.roomId.includes(roomId) && user.ws != ws) {
          user.ws.send(JSON.stringify(parsedData));
          sentCount++;
        }
      });
      console.log("  📤 Sent to", sentCount, "users in room");

      userQueue.add("shapeQueue", {
        roomId: roomId,
        shapes: JSON.stringify({ id: parsedData.messageId, shape: parsedData }),
        shapeAction: "UPDATE",
      });
      console.log("  ✅ Added to queue");
    } else if (parsedData.type === "delete_message") {
      const roomId = parsedData.roomId;
      console.log("🗑️ Delete message in room:", roomId);

      let sentCount = 0;
      User.map((user, _) => {
        if (user.roomId.includes(roomId) && user.ws != ws) {
          user.ws.send(JSON.stringify(parsedData));
          sentCount++;
        }
      });
      console.log("  📤 Sent to", sentCount, "users in room");

      userQueue.add("shapeQueue", {
        roomId: roomId,
        shapes: JSON.stringify({ id: parsedData.messageId, shape: parsedData }),
        shapeAction: "DELETE",
      });
      console.log("  ✅ Added to queue");
    }
  });

  ws.on("error", (error) => {
    console.error("❌ WebSocket error for user:", newUser.userId);
    console.error("Error:", error);
  });
});

server.listen(PORT, () => {
  console.log("\n✅ WebSocket Server is Running");
  console.log("🌐 Port:", PORT);
  console.log("🎯 Ready to accept connections");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
});
