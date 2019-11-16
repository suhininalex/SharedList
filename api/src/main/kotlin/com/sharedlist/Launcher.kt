package com.sharedlist

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import java.util.UUID

data class Item(val name: String)
data class Value(val name: String)

fun main() {
    Javalin.create{ config ->
        config.enableCorsForAllOrigins()
    }
    .routes {
        get("/api/items/:id") { context ->
            val id = context.pathParam("id")
            val list = ItemList(
                id,
                "До сала",
                listOf(
                    Item("Сало"),
                    Item("Лук"),
                    Item("Горилка")
                )
            )
            context.json(list)
            context.status(200)
        }

        patch("/api/items") { context ->
            val value = context.bodyAsClass(Value::class.java)
            val newElement = ItemList(
                generateUID(),
                value.name,
                listOf()
            )
            context.json(newElement)
            context.status(201)
        }

        get("/") { context ->
            context.result("Go duck yourself")
        }
    }
    .start(8080)
}

fun generateUID() = UUID.randomUUID().toString()

data class ItemList (val id: String, val name: String, val items: List<Item>)