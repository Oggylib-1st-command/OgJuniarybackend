# Generated by Django 4.2 on 2023-07-12 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_book_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='rating',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
